import { useState } from "react";
import Header from "../../Components/header/Header";
import styles from "./Checkout.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Checkout() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptedTerms(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!acceptedTerms) {
      MySwal.fire({
        title: "Atención",
        text: "Debe aceptar los términos y condiciones para continuar.",
        icon: "warning",
      });
      return;
    }
    alert("Cotización enviada con éxito.");
  };

  return (
    <div className={styles.container}>
      <Header nombre="Solicitud de Cotización" />
      <p className={styles.description}>
        Complete la información en las siguientes secciones
      </p>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <div className={styles.sectionNumber}>1</div>
          <div className={styles.sectionTitle}>Información Personal</div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder="Nombre Completo o de la Empresa *"
            />
          </div>
          <div className={styles.inputRow}>
            <input className={styles.input} placeholder="Teléfono *" />
            <input
              className={styles.input}
              placeholder="Correo Electrónico *"
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionNumber}>2</div>
          <div className={styles.sectionTitle}>Documentación</div>
          <div className={styles.inputRow}>
            <input className={styles.input} placeholder="Tipo de Documento *" />
            <input
              className={styles.input}
              placeholder="Número de Documento *"
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionNumber}>3</div>
          <div className={styles.sectionTitle}>Información Adicional</div>
          <textarea
            className={styles.textarea}
            placeholder="Comentarios (opcional)"
          ></textarea>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="terms">
            Acepto los <a href="#">términos y condiciones</a> y la{" "}
            <a href="#">política de privacidad</a>
          </label>
        </div>

        <button type="submit" className={styles.button}>
          Enviar cotización
        </button>
      </form>
    </div>
  );
}

export default Checkout;
