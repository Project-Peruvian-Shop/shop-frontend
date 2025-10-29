import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../../Components/login/SideBar";
import styles from "./Register.module.css";
import { routes } from "../../../utils/routes";
import { agregarAuthToken, agregarUsuario } from "../../../utils/auth";
import { register } from "../../../services/auht.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import IconSVG from "../../../Icons/IconSVG";

function Register() {
  const title = "Únete a nosotros";
  const subtitle = "Solicita tus cotizaciones de manera rápida y confiable";
  const list = [
    "Registro rápido y sencillo",
    "Datos protegidos y seguros",
    "Cotiza en simples pasos",
  ];

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  // Estados para inputs
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [passwordd, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{
    nombre?: string;
    apellidos?: string;
    email?: string;
    telefono?: string;
    passwordd?: string;
    confirmPassword?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const newErrors: {
      nombre?: string;
      apellidos?: string;
      email?: string;
      telefono?: string;
      passwordd?: string;
      confirmPassword?: string;
    } = {};
    
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre.trim())) {
      newErrors.nombre = "El nombre solo puede contener letras";
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(apellidos.trim())) {
      newErrors.apellidos = "Los apellidos solo pueden contener letras";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Ingresa un correo válido";
    }

    if (!/^\d{9}$/.test(telefono.trim())) {
      newErrors.telefono =
        "El teléfono debe tener exactamente 9 dígitos numéricos";
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordd.trim())) {
      newErrors.passwordd =
        "Debe tener al menos 8 caracteres, una letra y un número";
    }

    // Validar contraseñas
    if (passwordd !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
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
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
        passwordd: passwordd.trim(),
      };
      const response = await register(body);

      if (response) {
        agregarAuthToken(response.accessToken);
        agregarUsuario(response); // guardar usuario completo en localStorage

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
        navigate(routes.profile_user);
        Toast.fire({
          icon: "success",
          title: "Registro exitoso",
        });
      }
    } catch (error: unknown) {
      let mensaje;
      if (error instanceof Error) {
        mensaje = error.message;
      } else {
        mensaje = String(error);
      }
      MySwal.fire({
        icon: "error",
        title: "Error al registrarse",
        text: mensaje,
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <SideBar title={title} subtitle={subtitle} list={list} />
      </div>

      <div className={styles.right}>
        <div className={styles.loginTitle}>Crear Cuenta</div>
        <div className={styles.loginSubtitle}>
          Completa tus datos para registrarte
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.inputColumnGroup}>
            <div className={styles.inputGroup}>
              <label htmlFor="nombre" className={styles.label}>
                Nombre
              </label>
              <IconSVG name="userInput" className={styles.inputIcon} />
              <input
                type="text"
                id="nombre"
                className={styles.input}
                placeholder="Tu nombre"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {errors.nombre && (
                <span className={styles.errorText}>{errors.nombre}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="apellidos" className={styles.label}>
                Apellidos
              </label>
              <IconSVG name="userInput" className={styles.inputIcon} />
              <input
                type="text"
                id="apellidos"
                className={styles.input}
                placeholder="Tus apellidos"
                required
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
              {errors.apellidos && (
                <span className={styles.errorText}>{errors.apellidos}</span>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo Electrónico
            </label>
            <IconSVG name="emailInput" className={styles.inputIcon} />
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="ejemplo@dominio.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="telefono" className={styles.label}>
              Teléfono
            </label>
            <IconSVG name="phoneInput" className={styles.inputIcon} />
            <input
              type="tel"
              id="telefono"
              className={styles.input}
              placeholder="987 924 910"
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            {errors.telefono && (
              <span className={styles.errorText}>{errors.telefono}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <IconSVG name="passwordInput" className={styles.inputIcon} />
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              minLength={8}
              className={styles.input}
              placeholder="Ingresa tu contraseña"
              required
              value={passwordd}
              onChange={(e) => setPassword(e.target.value)}
            />

            {passwordVisible ? (
              <a onClick={() => setPasswordVisible(false)}>
                <IconSVG
                  name="eyeHidePassword"
                  className={styles.inputIconRight}
                />
              </a>
            ) : (
              <a onClick={() => setPasswordVisible(true)}>
                <IconSVG
                  name="eyeShowPassword"
                  className={styles.inputIconRight}
                />
              </a>
            )}
            {errors.passwordd && (
              <span className={styles.errorText}>{errors.passwordd}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirm-password" className={styles.label}>
              Confirmar Contraseña
            </label>
            <IconSVG name="passwordInput" className={styles.inputIcon} />
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              minLength={8}
              className={styles.input}
              placeholder="Confirma tu contraseña"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordVisible ? (
              <a onClick={() => setConfirmPasswordVisible(false)}>
                <IconSVG
                  name="eyeHidePassword"
                  className={styles.inputIconRight}
                />
              </a>
            ) : (
              <a onClick={() => setConfirmPasswordVisible(true)}>
                <IconSVG
                  name="eyeShowPassword"
                  className={styles.inputIconRight}
                />
              </a>
            )}
            {errors.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            ¿Ya tienes una cuenta?{" "}
            <Link to={routes.login} className={styles.footerLink}>
              Ingresa aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
