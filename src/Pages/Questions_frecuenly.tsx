import Banner from "../Components/Banner";

const faqs = [
    {
        question: "¿Cómo puedo comunicarme con atención al cliente?",
        answer: "Puedes contactarnos a través de nuestro formulario en línea, por correo electrónico o por teléfono, te recomendamos que nos escribas al whatsapp:+51 922723633 para poder ofrecerte una atención más rapida.",
        img:"https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
    },
    {
        question: "¿Puedo modificar mi pedido después de haberlo realizado?",
        answer: "Sí, puedes modificar tu pedido si aún no ha sido procesado. Contáctanos lo antes posible para ayudarte, escribiendo a nuestro whatsapp: +51 922723633 o tambien puedes contactarnos mediante la página de contáctenos rellenando el formulario.",
        img:"https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
    },
    {
        question: "¿Puedo recoger mi pedido en tienda?",
        answer: "Sí, ofrecemos la opción de recoger en la empresa. Nuestro equipo se pondra en contacto contigo para coordinar la entrega del pedido, en caso deses que se te envie ellos te brindarán la información de la entrega.",
        img:"https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
    }
    ,
    {
        question: "¿Cómo puedo obtener un comprobante de pago?",
        answer: "Nos pondremos en contácto contigo para verificar el pago del pedido y la entrega, una vez terminado este proceso te emitiremos una boleta o factura según nos indiques.",
        img:"https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
    }
    ,
    {
        question: "¿Qué hago si necesito tuberías en medidas específicas?",
        answer: "Escribenos a nuestro whatsapp: +51 922723633 e indicanos que necesitas tuberias con medidas especificas, para poder indicarte el procedimiento del pedido y cotizarte el precio de las tuberias.",
        img:"https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
    }
];

// Función para convertir números de teléfono en enlaces de WhatsApp
function linkWhatsapp(text: string) {
    return text.replace(/(\+51\s?\d{9})/g, (match) => {
        const num = match.replace(/\D/g, ""); 
        return `<a href="https://api.whatsapp.com/send/?phone=${num}&text=Hola+Tuber%C3%ADas+Peruanito%2C+vengo+de+la+p%C3%A1gina+web%2C+tengo+una+consulta+&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">${match}</a>`;
    })  ;
}   

const Questions_frecuenly = () => {
    return (
    <>
        <Banner title="Preguntas Frecuentes" />
        <section>
        {faqs.map((faq, idx) => (
            <details key={idx}>
            <summary>{faq.question}</summary>
            <p dangerouslySetInnerHTML={{ __html: linkWhatsapp(faq.answer) }} />
            <img src={faq.img} alt={faq.img} />
            </details>
        ))}
        </section>
    </>
    );
};

export default Questions_frecuenly;