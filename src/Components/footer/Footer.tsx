import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";
import logoBook from "../../Icons/Libro.avif";
import styles from "./Footer.module.css";
import { RRSS } from "../../utils/links";
import { Icons } from "../../Icons/icons";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contenedor}>
        <div className={styles.columna}>
          <p className={styles.title}>Acerca de</p>
          <Link to={routes.about}>Nuestra empresa</Link>
          <Link to={routes.contact}>Contáctenos</Link>
          <Link to={routes.questions}>Preguntas Frecuentes</Link>
        </div>

        <div className={styles.columna}>
          <p className={styles.title}>Productos</p>
          <Link to={routes.shop}>Alcantarillado</Link>
          <Link to={routes.shop}>Desagüe</Link>
          <Link to={routes.shop}>Instalaciones eléctricas</Link>
        </div>

        <div className={styles.columna}>
          <p className={styles.title}>Politicas de empresa</p>
          <Link to={routes.privacy_policy}>Politica de privacidad</Link>
          <Link to={routes.complaints_book}>Libro de reclamaciones</Link>
          <Link to={routes.tyc}>Términos y condiciones</Link>
          <Link to={routes.complaints_book}>
            <img
              src={logoBook}
              alt="libro-reclamaciones"
              className={styles.icon}
            />
          </Link>
        </div>

        <div className={styles.columna}>
          <p className={styles.title}>Redes sociales</p>

          <a
            href={RRSS.tiktok}
            className={styles.linkRRSS}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Icons.tiktok} alt="Tiktok" className={styles.iconRRSS} />
            Tiktok
          </a>

          <a
            href={RRSS.instagram}
            className={styles.linkRRSS}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Icons.instagram}
              alt="Instagram"
              className={styles.iconRRSS}
            />
            Instagram
          </a>

          <a
            href={RRSS.whatsapp}
            className={styles.linkRRSS}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Icons.whatsappPri}
              alt="WhatsApp"
              className={styles.iconRRSS}
            />
            WhatsApp
          </a>
        </div>
      </div>

      <div className={styles.divisor}></div>

      <div className={styles.copy}>
        Copyright © 2025 Tuberias Peruanito S.A.C, Todos los derechos reservados{" "}
      </div>
    </footer>
  );
}
export default Footer;
