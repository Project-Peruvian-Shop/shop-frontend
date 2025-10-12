import { useState } from "react";
import styles from "./Checkout.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useNavigate } from "react-router-dom";
import {
  clearCart,
  getCartFromLocalStorage,
} from "../../../utils/localStorage";
import { obtenerUsuario } from "../../../utils/auth";
import type { CotizacionRequestDTO } from "../../../models/Cotizacion/Cotizacion_request_dto";
import { postCotizacion } from "../../../services/cotizacion.service";
import Header from "../../../Components/header/Header";
import { routes } from "../../../utils/routes";

function Checkout() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const MySwal = withReactContent(Swal);
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [comentarios, setComentarios] = useState("");
  const navigate = useNavigate();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptedTerms(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const body: CotizacionRequestDTO = {
      usuarioID: usuario.id,
      nombre,
      tipoDocumento: tipoDocumento ? parseInt(tipoDocumento) : -1,
      documento: numeroDocumento,
      telefono,
      email,
      comentario: comentarios,
      productos: products,
    };

    try {
      const response = await postCotizacion(body);
      MySwal.fire({
        title: "La cotización se ha enviado correctamente.",
        text: "Nos pondremos en contacto contigo pronto.",
        imageUrl:
          "https://tuberiasperuanito.com/wp-content/uploads/2024/10/Logo-HD.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Logo de la empresa",
      });
      console.log("Respuesta backend:", response);
      setNombre("");
      setTipoDocumento("");
      setNumeroDocumento("");
      setTelefono("");
      setEmail("");
      setComentarios("");
      clearCart();
      navigate(routes.profile_user);
    } catch (error) {
      console.error(error);
      MySwal.fire({
        title: "Error",
        text: "Ocurrió un problema al enviar la cotización.",
        icon: "error",
      });
    }
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
              type="email"
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
              <option value="1">DNI</option>
              <option value="2">RUC</option>
              <option value="3">PASAPORTE</option>
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
          <label htmlFor="terms" className={styles.terms}>
            Acepto los <Link to={routes.tyc}>términos y condiciones</Link> y la{" "}
            <Link to={routes.privacy_policy}>política de privacidad</Link>
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
