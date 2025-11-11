import { useEffect, useState } from "react";
import style from "./FormLibro.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { obtenerUsuario } from "../../../utils/auth";
import { createLibroReclamaciones } from "../../../services/mensajes.service";
import Error from "../../Errortxt/Error";
import { CustomSelect } from "../../customSelect/CustomSelect";

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
  const [checkbox, setCheckbox] = useState(false);

  const [errors, setErrors] = useState<{
    nombre?: string;
    email?: string;
    tipoDocumento?: string;
    documento?: string;
    telefono?: string;
    tipoSolicitud?: string;
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
    if (!tipo) {
      newErrors.tipoSolicitud = "Selecciona un tipo de solicitud";
    }
    if (contenido.trim().length < 10) {
      newErrors.contenido =
        "El detalle de la reclamación debe tener al menos 10 caracteres";
    }
    if (!checkbox) {
      newErrors.checkbox = "Debes confirmar que la información es verídica";
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
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
              type="text"
              id="email"
              name="email"
              placeholder="Ingrese el email"
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
              placeholder="Ingrese su número de documento"
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
            {errors.tipoSolicitud && <Error message={errors.tipoSolicitud} />}
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
            {errors.contenido && <Error message={errors.contenido} />}
          </div>
        </div>

        <div className={style.termsSection}>
          <div className={style.termsBox}>
            <input
              type="checkbox"
              id="terms"
              checked={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
            />
            <label htmlFor="terms">
              Confirmo que la información proporcionada es verídica.
            </label>
          </div>
          <button type="submit" className={style.btnPrimary} disabled={loading}>
            {loading ? "Enviando..." : "Enviar Reclamación"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLibro;
