import styles from "./Cotizacion.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../utils/routes";
import Header from "../../Components/header/Header";
import { useEffect, useState } from "react";
import type { CotizacionFullDTO } from "../../models/Cotizacion/Cotizacion_response_dto";
import { getCotizacionById } from "../../services/cotizacion.service";
import InfoCard from "../../Components/dashboard/infocard/InfoCard";

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
      <Header nombre={`Cotización ${cotizacion?.numero}`} />

      <div className={styles.content}>
        <div className={styles.left}>
          <InfoCard
            title="Datos de la Cotización"
            items={[
              {
                label: "Número de cotización:",
                value: cotizacion?.numero || "",
              },
              {
                label: "Estado:",
                value: mapperEstado(cotizacion?.estado || "").label,
              },
              {
                label: "Fecha de cotización:",
                value: cotizacion?.creacion || "",
              },
              { label: "Comentario:", value: cotizacion?.comentario || "" },
            ]}
          />

          <InfoCard
            title="Datos de contacto"
            items={[
              {
                label: "Nº documento:",
                value: cotizacion?.documento || "",
              },
              { label: "Cliente:", value: cotizacion?.cliente || "" },
              { label: "Email:", value: cotizacion?.email || "" },
              {
                label: "Teléfono:",
                value: cotizacion?.telefono || "",
              },
            ]}
          />
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.title}>Productos de la cotización</div>

            <div className={styles.productsList}>
              {cotizacion?.productos.map((producto, i) => (
                <div key={i} className={styles.productRow}>
                  <div className={styles.productName}>{producto.name}</div>
                  <div className={styles.productDetails}>
                    {producto.cantidad} u
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.title}>Observaciones</div>
            <div className={styles.observations}>
              {cotizacion?.observaciones || "No hay observaciones."}
            </div>

            {cotizacion?.cotizacionEnlace && (
              <>
                <div className={styles.titlePDF}>PDF de la cotización</div>
                <div className={styles.pdfContainer}>
                  {/* Ver PDF en nueva pestaña */}
                  <a
                    href={cotizacion.cotizacionEnlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.pdfButton}
                  >
                    Ver PDF
                  </a>

                  {/* Descargar PDF directamente */}
                  <a
                    href={cotizacion.cotizacionEnlace}
                    download={`cotizacion-${cotizacion.numero}.pdf`}
                    className={styles.pdfButton}
                  >
                    Descargar PDF
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cotizacion;
