import style from "./Complaints_book.module.css";
import Header from "../../../Components/header/Header";
import { Icons } from "../../../Icons/icons";
import FormLibro from "../../../Components/landing/Libro_reclamaciones/FormLibro";

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
              <img src={Icons.whatsappSec} alt="whatsapp" />
            </a>
          </span>
          <span>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <img src={Icons.instagram} alt="instagram" />
            </a>
          </span>
          <span>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <img src={Icons.tiktok} alt="tiktok" />
            </a>
          </span>
        </div>
      </div>

      <FormLibro />
    </main>
  );
};

export default Complaints_book;
