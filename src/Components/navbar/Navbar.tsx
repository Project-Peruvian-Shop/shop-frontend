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
          <button className={styles.dropbtn}>Servicio ▾</button>
          <div className={styles.dropdownContent}>
            <Link to="/libro-reclamaciones">Libro de Reclamaciones</Link>
            <Link to="/politica-privacidad">Política de Privacidad</Link>
            <Link to="/terminos-condiciones">Términos y Condiciones</Link>
            <Link to="/faq">Preguntas Frecuentes</Link>
            <Link to="/contacto">Contáctenos</Link>
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
