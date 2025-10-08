import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../../Components/login/SideBar";
import styles from "./Login.module.css";
import { routes } from "../../../utils/routes";
import { agregarUsuario } from "../../../utils/auth";
import { useState } from "react";
import { login } from "../../../services/auht.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Login() {
  const title = "Bienvenido de vuelta";
  const subtitle = "Solicita tus cotizaciones de manera rápida y confiable";
  const list = [
    "Productos con calidad garantizada",
    "Historial de cotizaciones siempre disponible",
    "Cotiza en simples pasos",
  ];
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passwordd, setPassword] = useState("");
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const body = { email, passwordd };
      const response = await login(body);

      if (response) {
        // Guardar usuario en localStorage o como lo tengas implementado
        agregarUsuario(response);

        MySwal.fire({
          icon: "success",
          title: "¡Inicio de sesión exitoso!",
          text: `Bienvenido, ${response.nombre}`,
          confirmButtonText: "Continuar",
        }).then(() => {
          navigate(routes.shop_cart);
        });
      } else {
        alert("Usuario o contraseña incorrectos");
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
        title: "Error al iniciar sesión",
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
        <div className={styles.loginTitle}>Iniciar Sesión</div>

        <div className={styles.loginSubtitle}>
          Ingresa tus credenciales para continuar
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo Electrónico
            </label>
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
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="Ingresa tu contraseña"
              required
              value={passwordd}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.button}>
            Acceder a mi cuenta
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            ¿No tienes una cuenta?{" "}
            <Link to={routes.register} className={styles.footerLink}>
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
