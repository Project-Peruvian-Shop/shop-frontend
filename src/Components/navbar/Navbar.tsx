import { Link } from "react-router-dom";
import { routes } from "../../utils/routes.ts";
import logo from "../../Icons/Logo-HD.png";
import styles from "./Navbar.module.css";
import ButtonPrimary from "../buttons/ButtonPrimary.tsx";

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
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>Ayuda ▾</button>
          <div className={styles.dropdownContent}>
            <Link to={routes.complaints_book}>Libro de Reclamaciones</Link>
            <Link to={routes.privacy_policy}>Política de Privacidad</Link>
            <Link to={routes.tyc}>Términos y Condiciones</Link>
            <Link to={routes.questions}>Preguntas Frecuentes</Link>
            <Link to={routes.contact}>Contáctenos</Link>
          </div>
        </div>
      </div>

      {hasTokens ? (
        <div className={styles.authButtons}>
          <div>Componente Sesion</div>
        </div>
      ) : (
        <ButtonPrimary
          text="Contáctenos"
          click={() => alert("Contact us form coming soon!")}
        />
      )}
    </nav>
  );
};

export default Navbar;
