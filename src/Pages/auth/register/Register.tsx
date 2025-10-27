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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar contraseñas
    if (passwordd !== confirmPassword) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
        confirmButtonText: "Intentar de nuevo",
      });
      return;
    }

    try {
      const body = { nombre, apellidos, email, telefono, passwordd };
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

        <form className={styles.form} onSubmit={handleSubmit}>
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
              placeholder="+51 999 999 999"
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
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
          </div>

          <button type="submit" className={styles.button}>
            Crear mi cuenta
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
