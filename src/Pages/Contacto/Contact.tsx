import Banner from "../../Components/banner/Banner";
import Card from "../../Components/home/card/Card";
import Form from "../../Components/Form/Form";
import logoTiktok from '../../Icons/tik-tok.png';
import logoInstagram from '../../Icons/instagram.png';
import logoWhatsApp from '../../Icons/whatsapp.png';
import logoFacebook from '../../Icons/TYC/facebook.svg';
import phoneIcon from '../../Icons/Contact/phone_contact.svg';
import emailIcon from '../../Icons/Contact/email_contact.svg';
import locationIcon from '../../Icons/Contact/location_contact.png';
import style from './Contact.module.css';
import {routes} from '../../utils/routes'
const Contact = () => {
    return (
    <main>
        <Banner title="Contáctenos"/>
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
                <span><a href="http://" target="_blank" rel="noopener noreferrer"><img src={logoFacebook} alt="facebook" /></a></span>
                <span><a href="http://" target="_ blank" rel="noopener noreferrer"><img src={logoWhatsApp} alt="whatsapp" /></a></span>
                <span><a href="http://" target="_blank" rel="noopener noreferrer"><img src={logoInstagram} alt="instagram" /></a></span>
                <span><a href="http://" target="_blank" rel="noopener noreferrer"><img src={logoTiktok} alt="tiktok" /></a></span>
            </div>
        </div>
        <div>
            <Form
            title="Datos Personales"
            buttonText="Enviar consulta"
            fields={[
                {
                    label: "Nombre Completo/Razón Social*",
                    type: "text",
                    id: "fullName",
                    placeholder: "Ingrese su nombre completo o de la empresa",
                },
                {
                    label: "Tipo de documento*",
                    type: "select",
                    id: "documentType",
                    options: [
                        { value: "dni", label: "DNI" },
                        { value: "ruc", label: "RUC" },
                    ],
                },
                {
                    label: "Número de documento*",
                    type: "number",
                    id: "documentNumber",
                    placeholder: "Ingrese su número de documento",
                },
                {
                    label: "Teléfono/Celular*",
                    type: "number",
                    id: "phoneNumber",
                    placeholder: "Ingrese su número de teléfono o celular",
                },
                {
                    label: "Comentario o Mensaje*",
                    type: "textarea", 
                    id: "message",
                    placeholder:
                    "Describa de manera clara y detallada su consulta o requerimiento",
                },
                ]}
            />
        </div>
        <Banner title="Canales de atención"/>
        <div className={style.containerCanales}>
                <Card img={phoneIcon} title={<><span>Teléfono</span><br /><span>+51 922 723 633</span></>} alt="phone-icon" link={routes.contact} visible={false}/>
                <Card img={emailIcon} title={<><span>Correo</span><br /><span>wilmer.guevara@tuberiasperuanito.com</span></>} alt="email-icon" link={routes.contact} visible={false}/>
                <Card img={locationIcon} title={<><span>Dirección</span><br /><span>Puente Piedra - Lima</span></>} alt="ubicacion-icon" link={routes.contact} visible={false}/>

        </div>
    </main>
    )
} 

export default Contact;