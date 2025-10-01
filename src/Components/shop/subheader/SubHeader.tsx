import { Link } from "react-router-dom";
import styles from "./SubHeader.module.css";
import { routes } from "../../../utils/routes";

const SubHeader = () => {
  return (
    <div className={styles.container}>
      <h2>Tienda</h2>

      <div className={styles.navbar}>
        <Link to={routes.home} className={styles.links}>
          Inicio
        </Link>

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

        <Link to={routes.about} className={styles.links}>
          ¿Quiénes somos?
        </Link>
      </div>
    </div>
  );
};

export default SubHeader;
