import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { publicRoutes, routes } from "../../utils/routes";
import logo from "../../Icons/Logo-HD.png";
import styles from "./Navbar.module.css";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { obtenerUsuario } from "../../utils/auth";
import DropdownProfile from "../dropdown/DropdownProfile";

const Navbar = () => {
  const usuario = obtenerUsuario();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const showLandingButtons = publicRoutes.includes(currentPath);

  const [menuOpen, setMenuOpen] = useState(false);
  const [ayudaDropdownOpen, setAyudaDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleAyudaDropdown = () => {
    setAyudaDropdownOpen(!ayudaDropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* Ícono hamburguesa (solo en móviles) */}
      <div className={styles.menuIcon} onClick={toggleMenu}>
        {menuOpen ? "✕" : "☰"}
      </div>
      <Link to={routes.home}>
        <img src={logo} alt="logo-tuberias-peruanito" className={styles.logo} />
      </Link>

      {/* Links */}
      <div className={`${styles.links} ${menuOpen ? styles.active : ""}`}>
        <Link to={routes.home} onClick={() => setMenuOpen(false)}>
          Inicio
        </Link>
        <Link to={routes.about} onClick={() => setMenuOpen(false)}>
          ¿Quiénes somos?
        </Link>
        <Link to={routes.shop} onClick={() => setMenuOpen(false)}>
          Tienda
        </Link>

        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={toggleAyudaDropdown}>
            Ayuda ▾
          </button>
          {ayudaDropdownOpen && (
          <div className={styles.dropdownContent}>
            <Link to={routes.complaints_book} onClick={() => setMenuOpen(false)}>Libro de Reclamaciones</Link>
            <Link to={routes.privacy_policy} onClick={() => setMenuOpen(false)}>Política de Privacidad</Link>
            <Link to={routes.tyc} onClick={() => setMenuOpen(false)}>Términos y Condiciones</Link>
            <Link to={routes.questions} onClick={() => setMenuOpen(false)}>Preguntas Frecuentes</Link>
            <Link to={routes.contact} onClick={() => setMenuOpen(false)}>Contáctenos</Link>
          </div>
          )}
        </div>
      </div>

      {showLandingButtons && (
        <ButtonPrimary
          text="Contáctenos"
          click={() => navigate(routes.contact)}
        />
      )}

      {!showLandingButtons && usuario && (
        <div className={styles.userSection}>
          <DropdownProfile
            userName={usuario.nombre}
            userAvatar={usuario.avatar}
          />
        </div>
      )}

      {!showLandingButtons && !usuario && (
        <ButtonPrimary
          text="Iniciar sesión"
          click={() => navigate(routes.login)}
        />
      )}
    </nav>
  );
};

export default Navbar;
