import style from "./FormContactenos.module.css";
import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";
import { obtenerUsuario } from "../../utils/auth";

const FormContactenos = () => {
  // verificar si hay usuario, sino enviar a null en usuario_id
  const usuario = obtenerUsuario();
  const usuario_id = usuario ? usuario.id : null;

  return (
    <div className={style.containerFormulario}>
      <form>
        <input type="hidden" name="tipo" value="CONTACTENOS" />
        <input type="hidden" name="usuario_id" value={usuario_id} />

        <h3>Datos personales</h3>
        <div className={style.inputGroup}>
          <div className={style.inputWrapper}>
            <label htmlFor="nombre">Nombre Completo / Razón Social *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingrese el nombre"
              required
            />
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="tipoDocumento">Tipo de documento *</label>
            <select id="tipoDocumento" name="tipoDocumento" required>
              <option disabled>Seleccione</option>
              <option value="DNI">DNI</option>
              <option value="RUC">RUC</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="documento">Número de documento *</label>
            <input
              type="number"
              id="documento"
              name="documento"
              placeholder="Ingrese el número de documento"
              required
            />
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="telefono">Teléfono / Celular *</label>
            <input
              type="number"
              id="telefono"
              name="telefono"
              placeholder="Ingrese su número de teléfono o celular"
              required
            />
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
        </div>

        <div className={style.textareaGroup}>
          <div className={style.inputWrapper}>
            <label htmlFor="contenido">Comentario o mensaje *</label>
            <textarea
              id="contenido"
              name="contenido"
              placeholder="Describa de manera clara su consulta para poder atenderlo de forma eficiente."
              required
            />
          </div>
        </div>

        <div className={style.termsBox}>
          <input type="checkbox" id="terms" required />

          <label htmlFor="terms">
            Acepto los{" "}
            <Link to={routes.tyc} target="_blank" rel="noopener noreferrer">
              términos y condiciones
            </Link>{" "}
            y la{" "}
            <Link
              to={routes.privacy_policy}
              target="_blank"
              rel="noopener noreferrer"
            >
              política de privacidad
            </Link>
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
