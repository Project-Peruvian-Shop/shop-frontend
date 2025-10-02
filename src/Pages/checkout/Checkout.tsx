import { useState } from "react";
import Header from "../../Components/header/Header";
import styles from "./Checkout.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getCartFromLocalStorage } from "../../utils/localStorage";
import { obtenerUsuario } from "../../utils/auth";

function Checkout() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const MySwal = withReactContent(Swal);
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [comentarios, setComentarios] = useState("");

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

    const products = getCartFromLocalStorage();
    if (products.length === 0) {
      MySwal.fire({
        title: "Atención",
        text: "El carrito está vacío. Agregue productos antes de enviar la cotización.",
        icon: "warning",
      });
      return;
    }

    const usuario = obtenerUsuario();
    if (!usuario) {
      MySwal.fire({
        title: "Atención",
        text: "Debe iniciar sesión para enviar la cotización.",
        icon: "warning",
      });
      return;
    }

    const body = {
      usuarioID: usuario.id,
      nombre,
      tipoDocumento,
      documento: numeroDocumento,
      telefono,
      email,
      comentario: comentarios,
      productos: products,
    };

    console.log(body);
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder="Teléfono *"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Correo Electrónico *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionNumber}>2</div>
          <div className={styles.sectionTitle}>Documentación</div>
          <div className={styles.inputRow}>
            <select
              className={styles.select}
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
            >
              <option value="" disabled>
                Tipo de Documento *
              </option>
              <option value="0">DNI</option>
              <option value="1">RUC</option>
              <option value="2">PASAPORTE</option>
            </select>
            <input
              className={styles.input}
              placeholder="Número de Documento *"
              value={numeroDocumento}
              onChange={(e) => setNumeroDocumento(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionNumber}>3</div>
          <div className={styles.sectionTitle}>Información Adicional</div>
          <textarea
            className={styles.textarea}
            placeholder="Comentarios (opcional)"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            name="comentarios"
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
