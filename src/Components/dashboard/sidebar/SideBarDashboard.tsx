import { Link } from "react-router-dom";
import styles from "./SideBarDashboard.module.css";
import logo from "../../../Icons/Logo-HD.png";
import { obtenerUsuario } from "../../../utils/auth";
import { routes } from "../../../utils/routes";
import IconSVG from "../../../Icons/IconSVG";
import { useLogout } from "../../../hooks/useLogout";

export default function SideBarDashboard() {
  const usuario = obtenerUsuario();
  const logout = useLogout();

  const mapperRol = {
    ROLE_ADMIN: "Propietario",
    ROLE_USER: "Usuario",
    ROLE_MANAGER: "Administrador",
  };

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Link to={routes.home}>
          <img
            src={logo}
            alt="logo-tuberias-peruanito"
            className={styles.logo}
          />
        </Link>
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
          Líneas
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
        <Link to={routes.dashboard_profile} className={styles.menuItem}>
          <IconSVG name="usuarioIc" size={20} className={styles.icon} />
          Mi cuenta
        </Link>
        <button className={styles.logoutButton} onClick={logout}>
          <IconSVG name="logout" size={20} className={styles.icon} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
