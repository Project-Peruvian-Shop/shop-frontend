import style from "./FormContactenos.module.css";
import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";

const FormContactenos = () => {
  return (
    <div className={style.containerFormulario}>
      <form>
        <h3>Datos personales</h3>
        <div className={style.inputGroup}>
          <div className={style.inputWrapper}>
            <label htmlFor="fullName">Nombre Completo / Razón Social*</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Ingrese su nombre completo o de la empresa"
              required
            />
          </div>
          <div className={style.inputWrapper}>
            <label htmlFor="documentType">Tipo de documento*</label>
            <select id="documentType" name="documentType" required>
              <option value="">Seleccione</option>
              <option value="dni">DNI</option>
              <option value="ruc">RUC</option>
            </select>
          </div>
          <div className={style.inputWrapper}>
            <label htmlFor="documentNumber">Número de documento*</label>
            <input
              type="number"
              id="documentNumber"
              name="documentNumber"
              placeholder="Ingrese su número de documento"
              required
            />
          </div>
          <div className={style.inputWrapper}>
            <label htmlFor="phoneNumber">Teléfono / Celular*</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Ingrese su número de teléfono o celular"
              required
            />
          </div>
        </div>
        <div className={style.textareaGroup}>
          <div className={style.inputWrapper}>
            <label htmlFor="message">Comentario o mensaje*</label>
            <textarea
              id="message"
              name="message"
              placeholder="Describa de manera clara su consulta para poder atenderlo de forma eficiente..."
              required
            />
          </div>
        </div>
        <div className={style.termsBox}>
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            Acepto los <Link to={routes.tyc}>términos y condiciones</Link> y la{" "}
            <Link to={routes.privacy_policy}>política de privacidad</Link>
          </label>
          <button type="submit" className={style.btnPrimary}>
            Enviar mensaje
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormContactenos;
