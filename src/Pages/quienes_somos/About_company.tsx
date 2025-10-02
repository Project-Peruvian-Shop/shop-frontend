import Banner from "../../Components/banner/Banner";
import About from "../../Icons/About_company/user_icon.png";
import Compromiso from "../../Icons/About_company/compromiso.png";
import Responsabilidad from "../../Icons/About_company/responsabilidad.png";
import Excelencia from "../../Icons/About_company/excelencia.png";
import Trabajo_en_equipo from "../../Icons/About_company/trabajo_en_equipo.png";
import Innovacion from "../../Icons/About_company/Innovación.png";
import Mision from "../../Icons/About_company/mision.png";
import Vision from "../../Icons/About_company/vision.png";
import styles from "./About_company.module.css";
const About_company = () => {
    return (
        <main>
            <Banner title="¿Quiénes somos?" />
            <div className={styles.containerPadre}>
                <img src={About} alt="About Us" />
                <div className={styles.containerTexto}>
                    <p>
                        En <b>Tuberías Peruanito S.A.C.</b> nos especializamos en ofrecer soluciones en tuberías de alta calidad, innovadoras y sostenibles, 
                        orientadas a satisfacer las necesidades de sectores clave como la construcción, el saneamiento y la industria. 
                        Somos una empresa <b>100% peruana, orgullosos de contribuir</b> al desarrollo del país y firmemente comprometidos 
                        con el cuidado del medio ambiente, así como con la promoción de prácticas responsables a lo largo de toda nuestra cadena de producción.
                    </p>
                    <p>
                        Nuestros productos se fabrican mediante la <b>extrusión de compuestos de PVC</b>, un proceso eficiente y preciso que garantiza 
                        la calidad y resistencia de cada unidad. Utilizamos materiales de primera calidad, como estabilizantes de <b>Calcio/Zinc</b>, 
                        en sustitución de los metales pesados tradicionalmente empleados en la industria. Esta decisión no solo reduce el impacto ambiental 
                        de nuestros procesos, sino que también protege la salud de los trabajadores y usuarios finales, promoviendo una producción más limpia,
                        segura y responsable.
                    </p>
                    <p>Este enfoque nos permite ofrecer <b>productos duraderos, confiables y de alto rendimiento</b>, 
                        alineados con las crecientes exigencias de sostenibilidad del mercado nacional e internacional.
                        Además, trabajamos continuamente en la mejora de nuestros procesos mediante la innovación tecnológica,
                        reduciendo nuestra huella de carbono y optimizando el uso de recursos.</p>
                    <p>
                        Actualmente, seguimos contribuyendo activamente al desarrollo de <b>infraestructuras eficientes y 
                        sostenibles</b> en las regiones norte y sur del país, reafirmando nuestro compromiso con la <b>calidad, 
                        la innovación, el servicio excepcional</b> y, sobre todo, con la <b>preservación del entorno natural para las futuras generaciones.</b>
                    </p>
                </div>
            </div>
            <div className={styles.containerValores}>
                <h2>Valores</h2>
                <div className={styles.valoresGrid}>
                    <div className={styles.containerValor}>
                        <img src={Compromiso} alt="Valores" />
                        <h3>Compromiso</h3>
                    </div>
                    <div className={styles.containerValor}>
                        <img src={Responsabilidad} alt="Valores" />
                        <h3>Responsabilidad</h3>
                    </div>
                    <div className={styles.containerValor}>
                        <img src={Excelencia} alt="Valores" />
                        <h3>Excelencia</h3>
                    </div>
                    <div className={styles.containerValor}>
                        <img src={Trabajo_en_equipo} alt="Valores" />
                        <h3>Trabajo en equipo</h3>
                    </div>
                    <div className={styles.containerValor}>
                        <img src={Innovacion} alt="Valores" />
                        <h3>Innovación</h3>
                    </div>
                </div>
            </div>
            <div className={styles.containerMision}>
                <img src={Mision} alt="Misión" />
                <div className={styles.containerTextoMision}>
                    <h4>Misión</h4>
                    <p>Ofrecer una amplia gama de tuberías de alta calidad, diseñadas para satisfacer las necesidades de diversos sectores, 
                        desde la construcción hasta la industria. Nos comprometemos a brindar productos duraderos, 
                        con precios competitivos y un servicio excepcional que garantice la satisfacción y confianza de nuestros clientes. </p>
                </div>
            </div>
            <div className={styles.containerVision}>
                <img src={Vision} alt="Visión" />
                <div className={styles.containerTextoVision}>
                    <h4>Visión</h4>
                    <p>Ser la empresa de referencia en soluciones de tuberías, destacando por la innovación, 
                        calidad y sostenibilidad en cada uno de nuestros productos, contribuyendo al desarrollo 
                        de proyectos de infraestructura de clase mundial.</p>
                </div>
            </div>
        </main>
    )
}

export default About_company;