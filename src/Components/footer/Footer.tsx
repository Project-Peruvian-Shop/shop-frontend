import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";
import logoTiktok from "../../Icons/tik-tok.png";
import logoInstagram from "../../Icons/instagram.png";
import logoWhatsApp from "../../Icons/whatsapp.png";
import logoBook from "../../Icons/Libro.avif";
import styles from "./Footer.module.css";
import { RRSS } from "../../utils/links";

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
          <Link to={routes.about}>Alcantarillado</Link>
          <Link to={""}>Desagüe</Link>
          <Link to={""}>Instalaciones eléctricas</Link>
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
            <img src={logoTiktok} alt="Tiktok" className={styles.iconRRSS} />
            Tiktok
          </a>

          <a
            href={RRSS.instagram}
            className={styles.linkRRSS}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logoInstagram}
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
              src={logoWhatsApp}
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
