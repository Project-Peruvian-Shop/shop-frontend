import { Link, useNavigate } from "react-router-dom";
import styles from "./SideBarDashboard.module.css";
import logo from "../../../Icons/Logo-HD.png";
import { eliminarUsuario, obtenerUsuario } from "../../../utils/auth";
import { routes } from "../../../utils/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import IconSVG from "../../../Icons/IconSVG";

export default function SideBarDashboard() {
  const usuario = obtenerUsuario();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const mapperRol = {
    ROLE_ADMIN: "Propietario",
    ROLE_USER: "Usuario",
    ROLE_MANAGER: "Administrador",
  };

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

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} width={100} />
      </div>

      <hr className={styles.divider} />

      {/* Usuario */}
      <div className={styles.userInfo}>
        <IconSVG name="usuarioCircle" size={20} className={styles.userIcon} />
        <div>
          <p className={styles.userName}>{usuario?.nombre}</p>
          <span className={styles.userRole}>
            {mapperRol[usuario?.rol as keyof typeof mapperRol] || "Usuario"}
          </span>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Menú principal */}
      <nav className={styles.menu}>
        <Link to={routes.dashboard} className={styles.menuItem}>
          <IconSVG name="dashboard" size={20} className={styles.icon} />
          Dashboard
        </Link>
        <Link to={routes.dashboard_products} className={styles.menuItem}>
          <IconSVG name="producto" size={20} className={styles.icon} />
          Productos
        </Link>
        <Link to={routes.dashboard_categories} className={styles.menuItem}>
          <IconSVG name="categoria" size={20} className={styles.icon} />
          Categorías
        </Link>
        <Link to={routes.dashboard_cotizations} className={styles.menuItem}>
          <IconSVG name="cotizacion" size={20} className={styles.icon} />
          Cotizaciones
        </Link>
        <Link to={routes.dashboard_users} className={styles.menuItem}>
          <IconSVG name="usuarioIcon" size={20} className={styles.icon} />
          Usuarios
        </Link>
        <Link to={routes.dashboard_messages} className={styles.menuItem}>
          <IconSVG name="mensaje" size={20} className={styles.icon} />
          Mensajes
        </Link>
      </nav>

      <hr className={styles.divider} />

      {/* Parte inferior */}
      <div className={styles.bottomMenu}>
        <Link to={routes.profile_user} className={styles.menuItem}>
          <IconSVG name="usuarioIc" size={20} className={styles.icon} />
          Mi cuenta
        </Link>
        <button className={styles.logoutButton} onClick={handleCerrarSesion}>
          <IconSVG name="logout" size={20} className={styles.icon} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
