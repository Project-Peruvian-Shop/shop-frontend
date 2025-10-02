import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../Components/login/SideBar";
import { routes } from "../../utils/routes";
import { agregarUsuario } from "../../utils/auth";

function Register() {
  const title = "Únete a nosotros";
  const subtitle = "Solicita tus cotizaciones de manera rápida y confiable";
  const list = [
    "Registro rápido y sencillo",
    "Datos protegidos y seguros",
    "Cotiza en simples pasos",
  ];
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    agregarUsuario();
    navigate(routes.shop_cart);
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
              <label htmlFor="text" className={styles.label}>
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                className={styles.input}
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="text" className={styles.label}>
                Apellidos
              </label>
              <input
                type="text"
                id="apellidos"
                className={styles.input}
                placeholder="Tus apellidos"
                required
              />
            </div>
          </div>

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
            <label htmlFor="telefono" className={styles.label}>
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              className={styles.input}
              placeholder="+51 999 999 999"
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

          <div className={styles.inputGroup}>
            <label htmlFor="confirm-password" className={styles.label}>
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirm-password"
              className={styles.input}
              placeholder="Confirma tu contraseña"
              required
            />
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
