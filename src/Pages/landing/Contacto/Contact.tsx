import FormContactenos from "../../../Components/landing/Contactenos/FormContactenos";
import Card from "../../../Components/home/card/Card";
import { Icons } from "../../../Icons/icons";
import locationIcon from "../../../Icons/Contact/location_contact.png";
import style from "./Contact.module.css";
import Redes from "../../../Components/landing/Contactenos/Redes";
import Banner from "../../../Components/banner/Banner";
import { RRSS } from "../../../utils/links";

const Contact = () => {
  return (
    <main>
      <Banner title="Contáctenos" />

      <Redes />

      <FormContactenos />

      <Banner title="Canales de atención" />

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
          link={RRSS.whatsapp}
        />
        <Card
          img={Icons.email2}
          title={
            <>
              <span>Correo</span>
              <br />
              <span>wilmer.guevara @tuberiasperuanito.com</span>
            </>
          }
          alt="email-icon"
          link={RRSS.email}
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
          link={RRSS.maps}
        />
      </div>
    </main>
  );
};

export default Contact;
