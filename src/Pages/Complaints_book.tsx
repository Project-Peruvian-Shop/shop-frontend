import Banner from "../Components/Banner";
import Form from "../Components/Form";
import logoTiktok from '../Icons/tik-tok.png';
import logoInstagram from '../Icons/instagram.png';
import logoWhatsApp from '../Icons/whatsapp.png';
const Complaints_book = () => {
    return (
    <main>
        <Banner title="Libro de Reclamaciones"/>
        <p>
            Aquí puedes registrar una queja, presentar un reclamo o enviar sugerencias fácilmente. 
            Tu opinión es importante para nosotros y estamos comprometidos en mejorar continuamente nuestro servicio. 
            Por favor, proporciona toda la información necesaria para que podamos atender tu solicitud de manera rápida y efectiva.
        </p>
        <div>
            <div>
                <p>Télefono/Whatsapp</p>
                <p>+51 922 723 633</p>
            </div>
            <div>
                <p>Email</p>
                <p>wilmer.guevara@tuberiasperuanito.com</p>
            </div>
            <div>
                <p>Redes Sociales</p>
                <span><a href="http://" target="_blank" rel="noopener noreferrer"><img src={logoWhatsApp} alt="whatsapp" /></a></span>
                <span><a href="http://" target="_blank" rel="noopener noreferrer"><img src={logoInstagram} alt="instagram" /></a></span>
                <span><a href="http://" target="_blank" rel="noopener noreferrer"><img src={logoTiktok} alt="tiktok" /></a></span>
            </div>
        </div>
        <div>
            <Form
            title="Libro de reclamaciones"
            buttonText="Enviar reclamación"
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
                    label: "Tipo de solicitud",
                    type: "radio-card",
                    id: "tipoSolicitud",
                    options: [
                                {
                                    value: "reclamo",
                                    label: "Reclamo",
                                    description: "Disconformidad relacionada a los productos",
                                },
                                {
                                    value: "queja",
                                    label: "Queja",
                                    description: "Disconformidad no relacionada a los productos",
                                },
                            ],
                        },  
                {
                    label: "Detalle de la reclamación*",
                    type: "textarea", 
                    id: "message",
                    placeholder:
                    "Describa de manera clara y detallada los hechos que motivan su reclamo o queja..",
                },
                ]}
            />
            <img src="" alt="Imagen de IA" />
        </div>
    </main>
    )
}

export default Complaints_book;