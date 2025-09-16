import { Link } from "react-router-dom";
import { routes } from "../utils/routes";
import logoTiktok from '../assets/react.svg'
import logoInstagram from '../assets/react.svg'
import logoWhatsApp from '../assets/react.svg'
import logoBook from '../assets/react.svg'
function Footer() {
    return (
        <footer>
            <div>

                <p>Acerca de</p>
                <Link to={routes.about}>Nuestra empresa</Link>
                <Link to="/">Contáctenos</Link>
                <Link to="/">Preguntas Frecuentes</Link>
            

                <p>Productos</p>
                <Link to={routes.about}>Alcantarillado</Link>
                <Link to="/">Desagüe</Link>
                <Link to="/">Instalaciones eléctricas</Link>


                <p>Politicas de empresa</p>
                <Link to={routes.about}>Politica de privacidad</Link>
                <Link to="/">Libro de reclamaciones</Link>
                <Link to="/">Términos y condiciones</Link>
                <Link to="/"><img src={logoBook} alt="Libro de reclamaciones" /></Link>

                <p>Redes sociales</p>
                <Link to={routes.about}><img src={logoTiktok} alt="Tiktok" />Tiktok</Link>
                <Link to="/"><img src={logoInstagram} alt="Instagram" />Instagram</Link>
                <Link to="/"><img src={logoWhatsApp} alt="WhatsApp" />WhatsApp</Link>
            </div>
            <div></div>
            <div>
                <p>Copyright © 2025 Tuberias Peruanito S.A.C, Todos los derechos reservados </p>
            </div>
        </footer>
    );
};
export default Footer
