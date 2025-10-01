import { Link } from "react-router-dom";
import { routes } from "../../utils/routes.ts";
import Button from "../Button.tsx";
import logo from "../../Icons/Logo-HD.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  // Verifica si tiene token
  const hasTokens = false;

  return (
    <nav className={styles.navbar}>
      <div>
        <Link to={routes.home}>
          <img
            src={logo}
            alt="logo-tuberias-peruanito"
            className={styles.logo}
          />
        </Link>
      </div>

      <div className={styles.links}>
        <Link to={routes.home}>Inicio</Link>
        <Link to={routes.about}>¿Quiénes somos?</Link>
        <Link to={routes.shop}>Tienda</Link>
        <Link to={""}>Servicio</Link>
      </div>

      {hasTokens ? (
        <Button
          text="Contáctenos"
          onClick={() => alert("Contact us form coming soon!")}
          css="btn-primary"
        />
      ) : (
        <div className="auth-buttons">
          <Link to={routes.login}>Iniciar sesión</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
