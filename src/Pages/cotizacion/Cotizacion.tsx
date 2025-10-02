import styles from "./Cotizacion.module.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import Header from "../../Components/header/Header";
import userIcon from "../../Icons/user.svg";
import { useEffect, useState } from "react";
import { getProfile } from "../../services/usuario.service";
import type { UsuarioProfileDTO } from "../../models/Usuario/Usuario_response_dto";
import type { CotizacionUserDTO } from "../../models/Cotizacion/Cotizacion_response_dto";
import view from "../../Icons/view.svg";

function Cotizacion() {
  const navigate = useNavigate();

  const [fechaHora, setFechaHora] = useState(new Date());
  const [cotizacion, setCotizacion] = useState<CotizacionUserDTO | null>(null);

  useEffect(() => {
    // Actualizar fecha y hora cada segundo
    const interval = setInterval(() => setFechaHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Obtener datos completos desde el backend
  }, [navigate]);

  const mapperRol = (rol: string) => {
    switch (rol) {
      case "ROLE_ADMIN":
        return "Administrador";
      case "ROLE_USER":
        return "Usuario";
      case "ROLE_MANAGER":
        return "Gerente";
      default:
        return "Desconocido";
    }
  };

  // const mapperEstado = (estado: string) => {
  //   switch (estado) {
  //     case "0":
  //       return "Sin atender";
  //     case "1":
  //       return "Enviada";
  //     case "2":
  //       return "Cerrada";
  //     default:
  //       return "Desconocido";
  //   }
  // };

  // const getStatusClass = (status: string) => {
  //   switch (status) {
  //     case "0":
  //       return styles.sinAtender; // define en CSS color rojo o lo que quieras
  //     case "1":
  //       return styles.enviada; // color azul
  //     case "2":
  //       return styles.cerrada; // color verde
  //     default:
  //       return styles.desconocido; // gris u otro color
  //   }
  // };

  return (
    <div className={styles.container}>
      <Header nombre="Perfil de Usuario" />

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.title}>Datos de la cotización</div>
          </div>

          <div className={styles.card}>
            <div className={styles.title}>Datos de contacto</div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.title}>Productos de la cotización</div>
          </div>

          <div className={styles.card}>
            <div className={styles.title}>Observaciones</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cotizacion;
