import { Link } from "react-router-dom";
import SideBar from "../../Components/login/SideBar";
import styles from "./Login.module.css";
import { routes } from "../../utils/routes";

function Login() {
  const title = "Bienvenido de vuelta";
  const subtitle = "Solicita tus cotizaciones de manera rápida y confiable";
  const list = [
    "Productos con calidad garantizada",
    "Historial de cotizaciones siempre disponible",
    "Cotiza en simples pasos",
  ];

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

        <form className={styles.form}>
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
            />
          </div>

          <button type="submit" className={styles.button}>
            Acceder a mi cuenta
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            ¿No tienes una cuenta?{" "}
            <Link to={routes.register} className={styles.footerLink}>Regístrate gratis</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
