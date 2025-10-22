// WhatsAppButton.jsx
import { useLocation } from "react-router-dom";
import style from "./WhastappButton.module.css";
import IconSVG from "../../Icons/IconSVG";
const WhatsappButton = () => {
  const location = useLocation();
  const phoneNumber = "51922723633";
  const msj =
    "Hola,%20vengo%20de%20la%20tienda%20y%20me%20gustaría%20obtener%20más%20información%20sobre%20sus%20productos.";

  // Mostrar solo en estas rutas
  const showButton =
    location.pathname.startsWith("/tienda") ||
    location.pathname.startsWith("/producto");

  if (!showButton) return null;

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${msj}`}
      target="_blank"
      rel="noopener noreferrer"
      className={style.whatsappButton}
    >
      <span className={style.tooltip}>¿Tienes dudas? 🤔, Escríbenos 📱</span>
      <IconSVG name="whatsappWhi" />
    </a>
  );
};

export default WhatsappButton;
