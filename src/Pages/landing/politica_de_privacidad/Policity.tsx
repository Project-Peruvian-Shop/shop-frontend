import Banner from "../../../Components/banner/Banner";
import styles from "./Policity.module.css";

const Policity = () => {
  return (
    <main>
      <Banner title="Política de Privacidad" />

      <div className={styles.containerPadre}>
        <p>
          En Tuberías Peruanito S.A.C. respetamos tu privacidad y protegemos tu
          información personal según la Ley N.° 29733 de Protección de Datos
          Personales en el Perú.
        </p>
        <div className={styles.containerPolitica}>
          <div className={styles.headerPolitica}>
            <span className={styles.numero}>1</span>
            <h3>Información que recopilamos</h3>
          </div>
          <p>Podemos solicitar los siguientes datos en nuestros formularios:</p>
          <ul className={styles.lista}>
            <div className={styles.politicaIzq}>
              <li>Nombre completo o de la empresa</li>
              <li>Teléfono de contacto</li>
              <li>Comentarios o mensajes que nos envíes</li>
            </div>
            <div className={styles.politicaDer}>
              <li>Correo electrónico</li>
              <li>Tipo y número de documento (DNI, RUC)</li>
            </div>
          </ul>
        </div>
        <div className={styles.containerPolitica}>
          <div className={styles.headerPolitica}>
            <span className={styles.numero}>2</span>
            <h3>Uso de la información</h3>
          </div>
          <p>La información personal será utiliza para:</p>
          <ul className={styles.lista}>
            <div className={styles.politicaIzq}>
              <li>Atender tus solicitudes de cotización</li>
              <li>Mejorar la calidad de nuestra atención</li>
            </div>
            <div className={styles.politicaDer}>
              <li>Cumplir con requisitos legales y de seguridad</li>
              <li>Enviarte información relacionada con nuestros productos</li>
            </div>
          </ul>
        </div>
        <div className={styles.containerPolitica}>
          <div className={styles.headerPolitica}>
            <span className={styles.numero}>3</span>
            <h3>Seguridad y actualización</h3>
          </div>
          <ul className={styles.lista}>
            <div className={styles.politicaIzq}>
              <li>
                Implementamos buenas medidas técnicas y organizativas para
                proteger tu información y garantizar su confidencialidad.
              </li>
              <li>
                Nos reservamos el derecho de actualizar esta Política de
                Privacidad y cualquier cambio será publicado en esta página.
              </li>
              {/* </div> */}
              {/* <div className={styles.politicaDer}> */}
              <li>
                No compartimos tus datos con terceros, salvo obligación legal o
                requerimiento de autoridad competente.
              </li>
            </div>
          </ul>
        </div>
        <div className={styles.containerPolitica}>
          <div className={styles.headerPolitica}>
            <span className={styles.numero}>4</span>
            <h3>Derechos del usuario</h3>
          </div>
          <p>Como titular de tus datos, tienes derecho a:</p>
          <ul className={styles.lista}>
            <div className={styles.politicaIzq}>
              <li>Acceder a tu información.</li>
              <li>Solicitar su rectificación, actualización o cancelación.</li>
            </div>
            <div className={styles.politicaDer}>
              <li>Oponerte a su tratamiento para finalidades no esenciales.</li>
            </div>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Policity;
