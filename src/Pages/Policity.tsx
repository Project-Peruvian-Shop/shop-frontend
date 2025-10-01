import Banner from "../Components/banner/Banner";
const Policity = () => {
    return (
    <main>
        <Banner title="Política de Privacidad"/>
        <p>
            En Tuberías Peruanito S.A.C. respetamos tu privacidad y protegemos tu información personal según 
            la Ley N.° 29733 de Protección de Datos Personales en el Perú.
        </p>
        <div>
            <span>1.</span><h3>Información que recopilamos</h3>
            <p>Podemos solicitar los siguientes datos en nuestros formularios:</p>
            <ul>
                <li>Nombre completo o de la empresa</li>
                <li>Teléfono de contacto</li>
                <li>Comentarios o mensajes que nos envíes</li>
                <li>Correo electrónico</li>
                <li>Tipo y número de documento (DNI, RUC)</li>
            </ul>
        </div>
        <div>
            <span>2.</span><h3>Uso de la información</h3>
            <p>La información personal será utiliza para:</p>
            <ul>
                <li>Atender tus solicitudes de cotización</li>
                <li>Mejorar la calidad de nuestra atención</li>
                <li>Cumplir con requisitos legales y de seguridad</li>
                <li>Enviarte información relacionada con nuestros productos</li>
            </ul>
        </div>
        <div>
            <span>3.</span><h3>Seguridad y actualización</h3>
            <ul>
                <li>Implementamos buenas medidas técnicas y organizativas para proteger tu información y garantizar su confidencialidad.</li>
                <li>Nos reservamos el derecho de actualizar esta Política de Privacidad y cualquier cambio será publicado en esta página.</li>
                <li>No compartimos tus datos con terceros, salvo obligación legal o requerimiento de autoridad competente.</li>
            </ul>
        </div>
        <div>
            <span>4.</span><h3>Derechos del usuario</h3>
            <p>Como titular de tus datos, tienes derecho a:</p>
            <ul>
                <li>Acceder a tu información.</li>
                <li>Solicitar su rectificación, actualización o cancelación.</li>
                <li>Oponerte a su tratamiento para finalidades no esenciales.</li>
            </ul>
        </div>
    </main>
    )
}

export default Policity;