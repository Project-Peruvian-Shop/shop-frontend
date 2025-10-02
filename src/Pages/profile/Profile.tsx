import styles from "./Profile.module.css";
import { eliminarUsuario } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Header from "../../Components/header/Header";
import user from "../../Icons/user.svg";
import { useEffect, useState } from "react";

function Profile() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    return () => clearInterval(interval); // limpiar al desmontar
  }, []);

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
        eliminarUsuario(); // eliminar del localStorage
        MySwal.fire({
          icon: "success",
          title: "Sesión cerrada",
          text: "Tu sesión ha sido cerrada.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate(routes.login); // redirigir al login
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      <Header nombre="Perfil de Usuario" />

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.personal}>
            <div className={styles.title}>Mi Usuario</div>

            <div className={styles.nameContainer}>
              <img src={user} alt="logo-img" className={styles.logo} />
              <div className={styles.textContainer}>
                <span className={styles.name}>Nombre de Usuario</span>
                <span className={styles.tipo}>Tipo de usuario</span>
              </div>
            </div>

            <div className={styles.datetime}>
              <span className={styles.date}>
                {fechaHora.toLocaleDateString()} {/* Fecha */}
              </span>
              <span className={styles.time}>
                {fechaHora.toLocaleTimeString()} {/* Hora */}
              </span>
            </div>
          </div>

          <div className={styles.personal}>
            <div className={styles.title}>Mis datos personales</div>

            <div>
              <div className={styles.label}>Correo Electrónico</div>
              <div className={styles.email}>email@mail.com</div>
            </div>

            <div>
              <div className={styles.label}>Teléfono</div>
              <div className={styles.phone}>+34 123 456 789</div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.title}>Cotizaciones anteriores</div>
        </div>
      </div>

      <button className={styles.deleteButton} onClick={handleCerrarSesion}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Profile;
