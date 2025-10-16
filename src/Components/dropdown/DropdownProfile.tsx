import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./DropdownProfile.module.css";
import { routes } from "../../utils/routes";
import { useLogout } from "../../hooks/useLogout";
import IconSVG from "../../Icons/IconSVG";
import { obtenerUsuario } from "../../utils/auth";

interface UserDropdownClassicProps {
  userName: string;
  userAvatar?: string;
}

export default function DropdownProfile({
  userName,
  userAvatar,
}: UserDropdownClassicProps) {
  const usuario = obtenerUsuario();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logout = useLogout();

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      {/* Botón trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.dropdownButton}
      >
        {userAvatar ? (
          <img src={userAvatar} alt={userName} className={styles.avatar} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className={styles.userName}>{userName}</span>
        {/* <ChevronDown
          className={`${styles.chevron} ${isOpen ? styles.rotate : ""}`}
        /> */}
        <IconSVG
          name={isOpen ? "arrowUp" : "arrowDown"}
          className={styles.chevron}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {usuario?.rol === "ROLE_ADMIN" && (
            <Link
              to={routes.dashboard}
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              {/* <User className={styles.icon} /> */}
              <span>Dashboard</span>
            </Link>
          )}

          <Link
            to={routes.profile_user}
            className={styles.menuItem}
            onClick={() => setIsOpen(false)}
          >
            {/* <User className={styles.icon} /> */}
            <span>Mi perfil</span>
          </Link>

          <Link
            to={routes.cotizaciones}
            className={styles.menuItem}
            onClick={() => setIsOpen(false)}
          >
            {/* <FileText className={styles.icon} /> */}
            <span>Mis cotizaciones</span>
          </Link>

          <div className={styles.divider} />

          <div
            onClick={logout}
            className={`${styles.menuItem} ${styles.logout}`}
          >
            {/* <LogOut className={styles.icon} /> */}
            <span>Cerrar sesión</span>
          </div>
        </div>
      )}
    </div>
  );
}
