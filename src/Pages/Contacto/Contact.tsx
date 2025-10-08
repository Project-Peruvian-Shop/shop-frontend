import Card from "../../Components/home/card/Card";
import locationIcon from "../../Icons/Contact/location_contact.png";
import style from "./Contact.module.css";
import { routes } from "../../utils/routes";
import FormContactenos from "../../Components/Contactenos/FormContactenos";
import Header from "../../Components/header/Header";
import { Icons } from "../../Icons/icons";

const Contact = () => {
  return (
    <main>
      <Header nombre="Contáctenos" />

      <div className={style.containerContacto}>
        <div className={style.containerRedes}>
          <p>Whatsapp</p>
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
              <img src={Icons.facebook} alt="facebook" />
            </a>
          </span>
          <span>
            <a href="http://" target="_ blank" rel="noopener noreferrer">
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

      <FormContactenos />

      <Header nombre="Canales de atención" />

      <div className={style.containerCanales}>
        <Card
          img={Icons.phone}
          title={
            <>
              <span>Teléfono</span>
              <br />
              <span>+51 922 723 633</span>
            </>
          }
          alt="phone-icon"
          link={routes.contact}
          visible={false}
        />
        <Card
          img={Icons.email}
          title={
            <>
              <span>Correo</span>
              <br />
              <span>wilmer.guevara@tuberiasperuanito.com</span>
            </>
          }
          alt="email-icon"
          link={routes.contact}
          visible={false}
        />
        <Card
          img={locationIcon}
          title={
            <>
              <span>Dirección</span>
              <br />
              <span>Puente Piedra - Lima</span>
            </>
          }
          alt="ubicacion-icon"
          link={routes.contact}
          visible={false}
        />
      </div>
    </main>
  );
};

export default Contact;
