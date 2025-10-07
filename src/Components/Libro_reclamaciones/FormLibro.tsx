import style from "./FormLibro.module.css";

const FormLibro = () => {
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

        <div className={style.radioGroup}>
          <h3 className={style.radioGroupTitle}>Tipo de solicitud</h3>
          <div className={style.radioContainer}>
            <label className={style.radioLabel}>
              <div className={style.radioCard}>
                <input
                  type="radio"
                  name="tipoReclamo"
                  value="reclamo"
                  className={style.radioInput}
                  required
                />
                <span className={style.radioTitle}>Reclamo</span>
                <span className={style.radioDescription}>
                  Disconformidad relacionada a los productos
                </span>
              </div>
            </label>
            <label className={style.radioLabel}>
              <div className={style.radioCard}>
                <input
                  type="radio"
                  name="tipoReclamo"
                  value="queja"
                  className={style.radioInput}
                  required
                />
                <span className={style.radioTitle}>Queja</span>
                <span className={style.radioDescription}>
                  Disconformidad no relacionada a los productos
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className={style.textareaGroup}>
          <div className={style.inputWrapper}>
            <label htmlFor="message" className={style.radioGroupTitle}>
              Detalle de la reclamación
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Describa de manera clara y detallada los hechos que motivan su reclamo o queja..."
              required
            />
          </div>
        </div>

        <div className={style.termsBox}>
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            Confirmo que la información proporcionada es verídica.
          </label>
          <button type="submit" className={style.btnPrimary}>
            Enviar reclamación
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLibro;
