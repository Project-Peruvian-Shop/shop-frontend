import logoTiktok from "../../Icons/tik-tok.png";
import logoInstagram from "../../Icons/instagram.png";
import logoWhatsApp from "../../Icons/whatsapp.png";
import style from "./Complaints_book.module.css";
import FormLibro from "../../Components/Libro_reclamaciones/FormLibro";
import Header from "../../Components/header/Header";
const Complaints_book = () => {
  return (
    <main>
      <Header nombre="Libro de Reclamaciones" />

      <div className={style.intro}>
        <p>
          Aquí puedes registrar una queja, presentar un reclamo o enviar
          sugerencias fácilmente. Tu opinión es importante para nosotros y
          estamos comprometidos en mejorar continuamente nuestro servicio. Por
          favor, proporciona toda la información necesaria para que podamos
          atender tu solicitud de manera rápida y efectiva.
        </p>
      </div>

      <div className={style.containerContacto}>
        <div className={style.containerRedes}>
          <p>Télefono/Whatsapp</p>
          <p>+51 922 723 633</p>
        </div>
        <div className={style.containerRedes}>
          <p>Email</p>
          <p>wilmer.guevara@tuberiasperuanito.com</p>
        </div>
        <div className={style.containerRedes}>
          <p>Redes Sociales</p>
          <span>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <img src={logoWhatsApp} alt="whatsapp" />
            </a>
          </span>
          <span>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <img src={logoInstagram} alt="instagram" />
            </a>
          </span>
          <span>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <img src={logoTiktok} alt="tiktok" />
            </a>
          </span>
        </div>
      </div>

      <FormLibro />
    </main>
  );
};

export default Complaints_book;
