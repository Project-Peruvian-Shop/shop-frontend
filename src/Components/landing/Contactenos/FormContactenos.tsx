import style from "./FormContactenos.module.css";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/routes";
import { obtenerUsuario } from "../../../utils/auth";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { createContactenos } from "../../../services/mensajes.service";

const FormContactenos = () => {
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
  }, [usuario]);

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
        tipo: "CONTACTENOS",
        usuario_id,
      };
      const response = await createContactenos(body);

      if (response) {
        MySwal.fire({
          icon: "success",
          title: "¡Consulta enviada!",
          text: "Le agradecemos por contactarnos. Su consulta ha sido recibida y será atendida a la brevedad.",
        });
      }

      setNombre("");
      setTipoDocumento("");
      setDocumento("");
      setTelefono("");
      setEmail("");
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
              placeholder="Ingrese el número de documento"
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

        <div className={style.textareaGroup}>
          <div className={style.inputWrapper}>
            <label htmlFor="contenido">Comentario o mensaje *</label>
            <textarea
              id="contenido"
              name="contenido"
              placeholder="Describa de manera clara su consulta para poder atenderlo de forma eficiente."
              minLength={10}
              maxLength={500}
              required
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
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
