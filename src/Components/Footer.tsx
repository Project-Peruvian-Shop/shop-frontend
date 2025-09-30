import { Link } from "react-router-dom";
import { routes } from "../utils/routes";
import logoTiktok from '../Icons/tik-tok.png';
import logoInstagram from '../Icons/instagram.png';
import logoWhatsApp from '../Icons/whatsapp.png';
import logoBook from '../Icons/Libro.avif';
function Footer() {
    return (
        <footer>
            <div>

                <p>Acerca de</p>
                <Link to={routes.about}>Nuestra empresa</Link>
                <Link to={routes.contact}>Contáctenos</Link>
                <Link to={routes.questions}>Preguntas Frecuentes</Link>
            

                <Link to={routes.about}>Alcantarillado</Link>
                <Link to={""}>Desagüe</Link>
                <p>Productos</p>
                <Link to={""}>Instalaciones eléctricas</Link>


                <p>Politicas de empresa</p>
                <Link to={routes.privacy_policy}>Politica de privacidad</Link>
                <Link to={routes.complaints_book}>Libro de reclamaciones</Link>
                <Link to={routes.tyc}>Términos y condiciones</Link>
                <Link to={routes.complaints_book}><img src={logoBook} alt="Libro de reclamaciones" /></Link>

                <p>Redes sociales</p>
                <Link to={""}><img src={logoTiktok} alt="Tiktok" />Tiktok</Link>
                <Link to={""}><img src={logoInstagram} alt="Instagram" />Instagram</Link>
                <Link to={""}><img src={logoWhatsApp} alt="WhatsApp" />WhatsApp</Link>
            </div>
            <div></div>
            <div>
                <p>Copyright © 2025 Tuberias Peruanito S.A.C, Todos los derechos reservados </p>
            </div>
        </footer>
    );
};
export default Footer;
