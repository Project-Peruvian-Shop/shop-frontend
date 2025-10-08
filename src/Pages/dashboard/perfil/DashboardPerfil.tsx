import { useNavigate } from "react-router-dom";
import styles from "./DashboardPerfil.module.css";
import { useEffect, useState } from "react";
import type { UsuarioProfileDTO } from "../../../models/Usuario/Usuario_response_dto";
import { getProfile } from "../../../services/usuario.service";
import userIcon from "../../../Icons/user.svg";
import { obtenerUsuario } from "../../../utils/auth";
import { routes } from "../../../utils/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function DashboardPerfil() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [usuario, setUsuario] = useState<UsuarioProfileDTO | null>(null);
  const [fechaHora, setFechaHora] = useState(new Date());

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

    getProfile(localUser.id)
      .then((data) => setUsuario(data))
      .catch(() => {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la información del perfil",
        });
      });
  }, []);

  const mapperRol = (rol: string) => {
    switch (rol) {
      case "ROLE_ADMIN":
        return "Propietario";
      case "ROLE_USER":
        return "Usuario";
      case "ROLE_MANAGER":
        return "Administrador";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className={styles.container}>
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
          <div className={styles.personal}>
            <div className={styles.title}>Usuarios</div>
          </div>

          <div className={styles.personal}>Botones</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPerfil;
