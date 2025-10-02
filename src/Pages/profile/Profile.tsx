import styles from "./Profile.module.css";
import { eliminarUsuario } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Profile() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

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
      <h1>Perfil de Usuario</h1>
      <p>Aquí puedes ver tu información y administrar tu cuenta.</p>

      <button className={styles.deleteButton} onClick={handleCerrarSesion}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Profile;
