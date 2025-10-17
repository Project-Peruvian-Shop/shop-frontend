import FormContactenos from "../../../Components/landing/Contactenos/FormContactenos";
import Header from "../../../Components/header/Header";
import Card from "../../../Components/home/card/Card";
import { Icons } from "../../../Icons/icons";
import { routes } from "../../../utils/routes";
import locationIcon from "../../../Icons/Contact/location_contact.png";
import style from "./Contact.module.css";
import Redes from "../../../Components/landing/Contactenos/Redes";

const Contact = () => {
  return (
    <main>
      <Header nombre="Contáctenos" />

      <Redes />

      <FormContactenos />

      <Header nombre="Canales de atención" />

      <div className={style.containerCanales}>
        <Card
          img={Icons.phone2}
          title={
            <>
              <span>Teléfono</span>
              <br />
              <span>+51 922 723 633</span>
            </>
          }
          alt="phone-icon"
          link={routes.contact}
        />
        <Card
          img={Icons.email2}
          title={
            <>
              <span>Correo</span>
              <br />
              <span>wilmer.guevara
                @tuberiasperuanito.com</span>
            </>
          }
          alt="email-icon"
          link={routes.contact}
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
        />
      </div>
    </main>
  );
};

export default Contact;
