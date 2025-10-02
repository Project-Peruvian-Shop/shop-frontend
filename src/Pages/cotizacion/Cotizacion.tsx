import styles from "./Cotizacion.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../utils/routes";
import Header from "../../Components/header/Header";
import { useEffect, useState } from "react";
import type { CotizacionFullDTO } from "../../models/Cotizacion/Cotizacion_response_dto";
import { getCotizacionById } from "../../services/cotizacion.service";

function Cotizacion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [cotizacion, setCotizacion] = useState<CotizacionFullDTO | null>(null);

  useEffect(() => {
    if (!id) {
      navigate(routes.shop);
      return;
    }

    const fetchCotizacion = async (id: string) => {
      try {
        const data = await getCotizacionById(Number(id));
        setCotizacion(data);
      } catch (error) {
        console.error("Error al obtener la cotización:", error);
        navigate(routes.profile_user);
      }
    };

    fetchCotizacion(id);
  }, [id, navigate]);

  const mapperEstado = (estado: string) => {
    switch (estado) {
      case "0":
        return { label: "Sin atender", className: styles.sinAtender };
      case "1":
        return { label: "Enviada", className: styles.enviada };
      case "2":
        return { label: "Cerrada", className: styles.cerrada };
      default:
        return { label: "Desconocido", className: styles.desconocido };
    }
  };

  return (
    <div className={styles.container}>
      <Header nombre="Perfil de Usuario" />

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.title}>Datos de la cotización</div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Número de cotización:</div>
              <div className={styles.value}>{cotizacion?.numero}</div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Estado:</div>
              <div
                className={`${styles.value} ${
                  mapperEstado(cotizacion?.estado || "").className
                }`}
              >
                {mapperEstado(cotizacion?.estado || "").label}
              </div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Fecha de cotización:</div>
              <div className={styles.value}>{cotizacion?.creacion}</div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Comentario:</div>
              <div className={styles.value}>{cotizacion?.comentario}</div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.title}>Datos de contacto</div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Número de documento:</div>
              <div className={styles.value}>{cotizacion?.documento}</div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Cliente:</div>
              <div className={styles.value}>{cotizacion?.cliente}</div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Correo electrónico:</div>
              <div className={styles.value}>{cotizacion?.email}</div>
            </div>

            <div className={styles.rowcontent}>
              <div className={styles.label}>Número de teléfono:</div>
              <div className={styles.value}>{cotizacion?.telefono}</div>
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
