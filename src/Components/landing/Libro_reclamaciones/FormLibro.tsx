import { useEffect, useState } from "react";
import style from "./FormLibro.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { obtenerUsuario } from "../../../utils/auth";
import { createLibroReclamaciones } from "../../../services/mensajes.service";

const FormLibro = () => {
  const usuario = obtenerUsuario();
  const usuario_id = usuario ? usuario.id : null;

  const MySwal = withReactContent(Swal);

  // Estados para inputs
  const [nombre, setNombre] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [contenido, setContenido] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (usuario) {
      // Cargar los valores del usuario en el formulario
      setNombre(usuario.nombre || "");
      setEmail(usuario.email || "");
      setTipoDocumento(usuario.tipoDocumento || "");
      setDocumento(usuario.documento || "");
      setTelefono(usuario.telefono || "");

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Se han cargado tus datos personales",
      });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const body = {
        nombre,
        tipoDocumento,
        documento,
        telefono,
        email,
        contenido,
        tipo,
        usuario_id,
      };
      const response = await createLibroReclamaciones(body);

      if (response) {
        MySwal.fire({
          icon: "success",
          title: "¡Reclamación enviada!",
          text: "Le agradecemos por contactarnos. Su reclamación ha sido recibida y será atendida a la brevedad.",
        });
      }

      setNombre("");
      setTipoDocumento("");
      setDocumento("");
      setTelefono("");
      setEmail("");
      setTipo("");
      setContenido("");
    } catch (error: unknown) {
      let mensaje;
      if (error instanceof Error) {
        mensaje = error.message;
      } else {
        mensaje = String(error);
      }
      MySwal.fire({
        icon: "error",
        title: "Error al enviar la consulta",
        text: mensaje,
      });
    }
  };

  return (
    <div className={style.containerFormulario}>
      <form onSubmit={handleSubmit}>
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="email">Email *</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Ingrese el email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="tipoDocumento">Tipo de documento *</label>
            <select
              id="tipoDocumento"
              name="tipoDocumento"
              required
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
            >
              <option value="" disabled>
                Seleccione
              </option>
              <option value="DNI">DNI</option>
              <option value="RUC">RUC</option>
              <option value="PASAPORTE">Pasaporte</option>
              <option value="OTRO">Otro</option>
            </select>
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="documento">Número de documento *</label>
            <input
              type="string"
              id="documento"
              name="documento"
              placeholder="Ingrese su número de documento"
              required
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
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
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
        </div>

        <div className={style.radioGroup}>
          <h3 className={style.radioGroupTitle}>Tipo de solicitud</h3>

          <div className={style.radioContainer}>
            <label className={style.radioLabel}>
              <div className={style.radioCard}>
                <span className={style.radioTitle}>Reclamo</span>
                <div className={style.radioCardContent}>
                  <input
                    type="radio"
                    name="tipo"
                    value="RECLAMO"
                    className={style.radioInput}
                    required
                    checked={tipo === "RECLAMO"}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                  <span className={style.radioDescription}>
                    Disconformidad relacionada a los productos
                  </span>
                </div>
              </div>
            </label>

            <label className={style.radioLabel}>
              <div className={style.radioCard}>
                <span className={style.radioTitle}>Queja</span>
                <div className={style.radioCardContent}>
                  <input
                    type="radio"
                    name="tipo"
                    value="QUEJA"
                    className={style.radioInput}
                    required
                    checked={tipo === "QUEJA"}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                  <span className={style.radioDescription}>
                    Disconformidad no relacionada a los productos
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className={style.textareaGroup}>
          <div className={style.inputWrapper}>
            <label htmlFor="contenido" className={style.radioGroupTitle}>
              Detalle de la reclamación
            </label>
            <textarea
              id="contenido"
              name="contenido"
              placeholder="Describa de manera clara y detallada los hechos que motivan su reclamo o queja."
              required
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
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
