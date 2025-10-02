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

            <div className={styles.rowcontent}>
              <div className={styles.label}>Número de cotización:</div>
              <div className={styles.value}>#123456</div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Estado:</div>
              <div className={styles.value}>Enviado</div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Fecha de cotización:</div>
              <div className={styles.value}>17/10/2023</div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Comentario:</div>
              <div className={styles.value}>
                Este es un comentario de prueba.
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.title}>Datos de contacto</div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Número de documento:</div>
              <div className={styles.value}>RUC - 12345678901</div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Cliente:</div>
              <div className={styles.value}>Juan Pérez</div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Correo electrónico:</div>
              <div className={styles.value}>juan.perez@example.com</div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Número de teléfono:</div>
              <div className={styles.value}>+51 987 654 321</div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.title}>Productos de la cotización</div>
          </div>

          <div className={styles.card}>
            <div className={styles.title}>Observaciones</div>
            <div className={styles.observations}>
              Aquí puedes agregar cualquier observación adicional sobre la
              cotización.
            </div>

            <div className={styles.titlePDF}>PDF de la cotización</div>
            <div className={styles.pdfContainer}>
              <button className={styles.pdfButton}>Ver PDF</button>
              <button className={styles.pdfButton}>Descargar PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cotizacion;
