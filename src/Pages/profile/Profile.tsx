import styles from "./Profile.module.css";
import { eliminarUsuario, obtenerUsuario } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Header from "../../Components/header/Header";
import userIcon from "../../Icons/user.svg";
import { useEffect, useState } from "react";
import { getProfile } from "../../services/usuario.service";
import type { UsuarioProfileDTO } from "../../models/Usuario/Usuario_response_dto";

function Profile() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [fechaHora, setFechaHora] = useState(new Date());
  const [usuario, setUsuario] = useState<UsuarioProfileDTO | null>(null);

  useEffect(() => {
    // Actualizar fecha y hora cada segundo
    const interval = setInterval(() => setFechaHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const localUser = obtenerUsuario(); // trae usuario desde localStorage
    if (!localUser) {
      navigate(routes.login);
      return;
    }

    // Obtener datos completos desde el backend
    getProfile(localUser.id)
      .then((data) => setUsuario(data))
      .catch(() => {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la información del perfil",
        });
      });
  }, [navigate]);

  const handleCerrarSesion = () => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción cerrará tu sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarUsuario();
        MySwal.fire({
          icon: "success",
          title: "Sesión cerrada",
          text: "Tu sesión ha sido cerrada.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate(routes.login);
        });
      }
    });
  };

  const mapperRol = (rol: string) => {
    switch (rol) {
      case "ROLE_ADMIN":
        return "Administrador";
      case "ROLE_USER":
        return "Usuario";
      case "ROLE_MANAGER":
        return "Gerente";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className={styles.container}>
      <Header nombre="Perfil de Usuario" />

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.personal}>
            <div className={styles.title}>Mi Usuario</div>

            <div className={styles.nameContainer}>
              <img src={userIcon} alt="logo-img" className={styles.logo} />
              <div className={styles.textContainer}>
                <span className={styles.name}>
                  {usuario ? usuario.nombre : "Cargando..."}
                </span>
                <span className={styles.tipo}>
                  {usuario ? mapperRol(usuario.rol) : "Cargando..."}
                </span>
              </div>
            </div>

            <div className={styles.datetime}>
              <span className={styles.date}>
                {fechaHora.toLocaleDateString()}
              </span>
              <span className={styles.time}>
                {fechaHora.toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className={styles.personal}>
            <div className={styles.title}>Mis datos personales</div>

            <div>
              <div className={styles.label}>Correo Electrónico</div>
              <div className={styles.email}>
                {usuario ? usuario.email : "Cargando..."}
              </div>
            </div>

            <div>
              <div className={styles.label}>Teléfono</div>
              <div className={styles.phone}>
                {usuario ? usuario.telefono : "Cargando..."}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.title}>Cotizaciones anteriores</div>
          {/* Aquí puedes agregar un componente para listar las cotizaciones */}
        </div>
      </div>

      <button className={styles.deleteButton} onClick={handleCerrarSesion}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Profile;
