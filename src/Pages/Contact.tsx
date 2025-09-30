import Banner from "../Components/Banner";
import Card from "../Components/Card";
import Form from "../Components/Form";
import logoTiktok from '../Icons/tik-tok.png';
import logoInstagram from '../Icons/instagram.png';
import logoWhatsApp from '../Icons/whatsapp.png';
const Contact = () => {
    return (
    <main>
        <Banner title="Contáctenos"/>
        <div>
            <div>
                <p>Whatsapp</p>
                <p>+51 922 723 633</p>
            </div>
            <div>
                <p>Email</p>
                <p>wilmer.guevara@tuberiasperuanito.com</p>
            </div>
            <div>
                <p>Redes Sociales</p>
                <span><a href="http://" target="_blank" rel="noopener noreferrer"><img src="" alt="facebook" /></a></span>
                <span><a href="http://" target="_blank" rel="noopener noreferrer"><img src={logoWhatsApp} alt="whatsapp" /></a></span>
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
            <img src="" alt="Imagen de IA" />
        </div>
        <Banner title="Canales de atención"/>
        <Card img={""} title={<><span>Teléfono</span><br /><span>+51 922 723 633</span></>} alt="phone-icon" link={""} visible={false}/>
        <Card img={""} title={<><span>Correo</span><br /><span>wilmer.guevara@tuberiasperuanito.com</span></>} alt="email-icon" link={""} visible={false}/>
        <Card img={""} title={<><span>Dirección</span><br /><span>Puente Piedra - Lima</span></>} alt="ubicacion-icon" link={""} visible={false}/>
        <Banner title="Nuestra Ubicación"/>
        <div>
            {/*Aqui deberia ir el icono de google maps*/}
            <img src="../Icons/map.png" alt="map-icon" />
            <p>210 Los Rosales Puente Piedra, Provincia de Lima</p>
        </div>
    </main>
    )
}

export default Contact;