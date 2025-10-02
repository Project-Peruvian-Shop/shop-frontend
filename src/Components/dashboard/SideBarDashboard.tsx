import { Link, useNavigate } from "react-router-dom";
import styles from "./SideBarDashboard.module.css";
import logo from "../../Icons/Logo-HD.png";
import categoria from "../../Icons/dashboard/categoria.svg";
import cotizacion from "../../Icons/dashboard/cotizacion.svg";
import dashboard from "../../Icons/dashboard/dashboard.svg";
import mensaje from "../../Icons/dashboard/mensaje.svg";
import producto from "../../Icons/dashboard/producto.svg";
import usuarioIcon from "../../Icons/dashboard/usuario.svg";
import usuarioCircle from "../../Icons/dashboard/user-circle.svg";
import usuarioIc from "../../Icons/dashboard/user.svg";
import logout from "../../Icons/dashboard/logout.svg";
import { eliminarUsuario, obtenerUsuario } from "../../utils/auth";
import { routes } from "../../utils/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
        <img src={usuarioCircle} alt="Usuario" className={styles.userIcon} />
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
          <img src={dashboard} alt="Dashboard" className={styles.icon} />
          Dashboard
        </Link>
        <Link to={routes.dashboard_products} className={styles.menuItem}>
          <img src={producto} alt="Productos" className={styles.icon} />
          Productos
        </Link>
        <Link to={routes.dashboard_categories} className={styles.menuItem}>
          <img src={categoria} alt="Categorías" className={styles.icon} />
          Categorías
        </Link>
        <Link to={routes.dashboard_cotizations} className={styles.menuItem}>
          <img src={cotizacion} alt="Cotizaciones" className={styles.icon} />
          Cotizaciones
        </Link>
        <Link to={routes.dashboard_users} className={styles.menuItem}>
          <img src={usuarioIcon} alt="Usuarios" className={styles.icon} />
          Usuarios
        </Link>
        <Link to={routes.dashboard_messages} className={styles.menuItem}>
          <img src={mensaje} alt="Mensajes" className={styles.icon} />
          Mensajes
        </Link>
      </nav>

      <hr className={styles.divider} />

      {/* Parte inferior */}
      <div className={styles.bottomMenu}>
        <Link to={routes.profile_user} className={styles.menuItem}>
          <img src={usuarioIc} alt="Mi cuenta" className={styles.icon} />
          Mi cuenta
        </Link>
        <button className={styles.logoutButton} onClick={handleCerrarSesion}>
          <img src={logout} alt="Cerrar sesión" className={styles.icon} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
