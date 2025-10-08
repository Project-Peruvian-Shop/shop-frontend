import Banner from "../../../Components/banner/Banner";
import { Icons } from "../../../Icons/icons";
import styles from "./TermsAndConditions.module.css";

const TermsAndConditions = () => {
  return (
    <main>
      <Banner title="Términos y Condiciones" />
      <div className={styles.containerPadre}>
        <div className={styles.containerFlex}>
          <div className={styles.containerTerminos}>
            <div className={styles.headerTerminos}>
              <span className={styles.numero}>1</span>
              <h2>Información personal</h2>
            </div>
            <div className={styles.bodyTerminos}>
              <p>
                Al usar la web de Tuberías Peruanito S.A.C. (RUC 20612174424,
                Puente Piedra – Lima) aceptas estos términos. Nuestros productos
                son para instalaciones eléctricas, alcantarillado, desagüe e
                industrias, y pueden actualizarse sin previo aviso. Las
                cotizaciones serán atendidas en un plazo razonable y no
                garantizan un pedido; dependen de disponibilidad y validación.
                Podemos rechazar solicitudes con información incompleta o
                sospechosa de fraude.
              </p>
            </div>
          </div>
          <div className={styles.containerTerminos}>
            <div className={styles.headerTerminos}>
              <span className={styles.numero}>2</span>
              <h2>Responsabilidad y Privacidad</h2>
            </div>
            <div className={styles.bodyTerminos}>
              <p>
                El cliente es responsable del uso adecuado de los productos y de
                cumplir las normas locales. El contenido del sitio está
                protegido y no puede reproducirse sin autorización. Protegemos
                tus datos personales y los usamos únicamente para cotizaciones,
                sin compartir con terceros sin tu consentimiento. Podemos
                modificar estos términos en cualquier momento, vigentes desde su
                publicación y se rigen por las leyes peruanas.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.containerFlex}>
          <div className={styles.containerTerminos}>
            <div className={styles.headerTerminos}>
              <span className={styles.numero}>3</span>
              <h2>Devoluciones y Garantías</h2>
            </div>
            <div className={styles.bodyTerminos}>
              <p>
                Solo aceptamos devoluciones de productos defectuosos dentro de
                los 30 días posteriores a la entrega, con pruebas del daño. No
                aplican devoluciones por error del cliente. Los productos tienen
                garantía contra defectos de fabricación por 2 años, sin cubrir
                mal uso o instalación incorrecta. Según el caso, se ofrece
                reparación o reemplazo.
              </p>
            </div>
          </div>
          <div className={styles.containerTerminos}>
            <div className={styles.headerTerminos}>
              <span className={styles.numero}>4</span>
              <h2>¿Tienes Dudas?</h2>
            </div>
            <div className={styles.bodyTerminos}>
              <p>Estamos aquí para ayudarte con cualquier consulta.</p>
              <span className={styles.containerRedes}>
                <img src={Icons.email} alt="email" />
                <p>wilmer.guevara@tuberiasperuanito.com</p>
              </span>
              <span className={styles.containerRedes}>
                <img src={Icons.phone} alt="phone" />
                <p>+51 922 723 633</p>
              </span>
              <span className={styles.containerRedes}>
                <img src={Icons.tiktok} alt="tiktok" />
                <p>Tuberias_Peruanito_S.A.C</p>
              </span>
              <span className={styles.containerRedes}>
                <img src={Icons.instagram} alt="instagram" />
                <p>Tuberias_Peruanito_S.A.C</p>
              </span>
              <span className={styles.containerRedes}>
                <img src={Icons.facebook} alt="facebook" />
                <p>Tuberias_Peruanito_S.A.C</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditions;
