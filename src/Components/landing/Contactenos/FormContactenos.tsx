import style from "./FormContactenos.module.css";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/routes";
import { obtenerUsuario } from "../../../utils/auth";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
//import { createContactenos } from "../../../services/mensajes.service";
import Error from "../../Errortxt/Error";
import { CustomSelect } from "../../customSelect/CustomSelect";
import emailjs from "@emailjs/browser";

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
  const [checkbox, setCheckbox] = useState(false);

  const [errors, setErrors] = useState<{
    nombre?: string;
    email?: string;
    tipoDocumento?: string;
    documento?: string;
    telefono?: string;
    contenido?: string;
    checkbox?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const options = [
    { value: "DNI", label: "DNI" },
    { value: "RUC", label: "RUC" },
    { value: "PASAPORTE", label: "PASAPORTE" },
    { value: "OTRO", label: "OTRO" },
  ];
  useEffect(() => {
    if (usuario) {
      // Cargar los valores del usuario en el formulario
      setEmail(usuario.email || "");
      setTipoDocumento(usuario.tipoDocumento || "");
      setNombre(usuario.nombre || "");
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

    setErrors({});

    const newErrors: {
      nombre?: string;
      email?: string;
      tipoDocumento?: string;
      documento?: string;
      telefono?: string;
      tipoSolicitud?: string;
      contenido?: string;
      checkbox?: string;
    } = {};

    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre.trim())) {
      newErrors.nombre = "El nombre solo puede contener letras";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Ingresa un correo válido";
    }
    if (!tipoDocumento) {
      newErrors.tipoDocumento = "Selecciona un tipo de documento";
    }
    if (!/^\d+$/.test(documento)) {
      newErrors.documento = "El número de documento debe ser numérico";
    }
    if (!/^\d{9}$/.test(telefono)) {
      newErrors.telefono = "El número de teléfono debe contener 9 dígitos";
    }
    if (contenido.trim().length < 10) {
      newErrors.contenido =
        "El detalle de la reclamación debe tener al menos 10 caracteres";
    }
    if (!checkbox) {
      newErrors.checkbox =
        "Debes confirmar que estas de acuerdo con los términos y la política ";
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: newErrors.checkbox,
      });
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (loading) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);

    try {
      /*const body = {
        nombre,
        tipoDocumento,
        documento,
        telefono,
        email,
        contenido,
        tipo: "CONTACTENOS",
        usuario_id,
      };*/
      // ==== EMAILJS ====
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_WEB,
        {
          title: "Formulario Contáctenos",
          name: nombre,
          document_type: tipoDocumento,
          document_number: documento,
          phone: telefono,
          email: email,
          time: new Date().toLocaleString(),
          message_type: "CONTACTENOS",
          message: contenido,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      //const response = await createContactenos(body);

      if (emailjs) {
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
      setCheckbox(false);
    } catch (error) {
      const err = error as Error;
      const mensaje = err.message || "Ha ocurrido un error inesperado.";
      MySwal.fire({
        icon: "error",
        title: "Error al registrarse",
        text: mensaje,
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  return (
    <div className={style.containerFormulario}>
      <form onSubmit={handleSubmit} noValidate>
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
            {errors.nombre && <Error message={errors.nombre} />}
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
            {errors.email && <Error message={errors.email} />}
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="tipoDocumento">Tipo de documento *</label>
            <CustomSelect
              options={options}
              onChange={(e) => setTipoDocumento(e)}
              placeholder="Seleccione"
            />
            {errors.tipoDocumento && <Error message={errors.tipoDocumento} />}
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
            {errors.documento && <Error message={errors.documento} />}
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
            {errors.telefono && <Error message={errors.telefono} />}
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
            {errors.contenido && <Error message={errors.contenido} />}
          </div>
        </div>

        <div className={style.termsBox}>
          <input
            type="checkbox"
            id="terms"
            required
            checked={checkbox}
            onChange={(e) => setCheckbox(e.target.checked)}
          />

          <label htmlFor="terms" className={style.terms}>
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

          <button type="submit" className={style.btnPrimary} disabled={loading}>
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormContactenos;
