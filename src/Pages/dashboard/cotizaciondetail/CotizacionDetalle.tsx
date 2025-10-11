import styles from "./CotizacionDetalle.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../utils/routes";
import InfoCard from "../../../Components/dashboard/infocard/InfoCard";
import { useEffect, useState } from "react";
import type {
  CotizacionDashboardDTO,
  CotizacionFullDTO,
} from "../../../models/Cotizacion/Cotizacion_response_dto";
import {
  getCotizacionById,
  updateObservacionCotizacion,
} from "../../../services/cotizacion.service";
import ButtonHeader from "../../../Components/dashboard/buttonheader/ButtonHeader";
import ModalObservacion from "../../../Components/dashboard/Modals/Cotizaciones/ModalObservaciones";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function CotizacionDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [cotizacion, setCotizacion] = useState<CotizacionFullDTO | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] =
    useState<CotizacionDashboardDTO | null>(null);
  const MySwal = withReactContent(Swal);
  // const [productosData, setProductosData] =
  //   useState<PaginatedResponse<ProductoResponseDTO> | null>(null);
  // const [currentPage, setCurrentPage] = useState(0);
  // const pageSize = 6;

  useEffect(() => {
    if (!id) {
      navigate(routes.shop);
      return;
    }

    const fetchCotizacion = async (id: string) => {
      try {
        const data = await getCotizacionById(Number(id));
        setCotizacion(data);
        // setProductosData(data.productos);
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
  const handleSaveObservacion = async (
  id: number,
  nuevaObservacion: string
) => {
  if (!selectedCotizacion || !cotizacion) return;

  try {
    const observacionOriginal = selectedCotizacion.observaciones || "";

    if (nuevaObservacion.trim() === "") {
      await MySwal.fire({
        icon: "warning",
        title: "Observación vacía",
        text: "Por favor, ingresa una observación.",
      });
      return;
    }

    if (nuevaObservacion.trim() === observacionOriginal.trim()) {
      await MySwal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "No se detectaron modificaciones en la observación.",
      });
      return;
    }

    await updateObservacionCotizacion(id, nuevaObservacion);

    // Actualiza el estado local para reflejar los cambios
    setCotizacion({
      ...cotizacion,
      observaciones: nuevaObservacion,
    });
    setShowModal(false);
    await MySwal.fire({
      icon: "success",
      title: "¡Observación actualizada!",
      text: "La observación ha sido modificada correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar observaciones:", error);
    MySwal.fire({
      icon: "error",
      title: "Error al actualizar",
      text: "No se pudo guardar la observación.",
    });
  }
};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Cotización {cotizacion?.numero}</div>
        <div className={styles.actions}>
          <ButtonHeader
            title="Editar"
            onClick={() => {
              if (cotizacion) {
                setSelectedCotizacion({
                  id: cotizacion.id,
                  numeroCotizacion: cotizacion.numero,
                  clienteNombre: cotizacion.cliente,
                  clienteDocumento: cotizacion.documento || "",
                  creacion: cotizacion.creacion || "",
                  comentario: cotizacion.comentario || "",
                  estado: cotizacion.estado,
                  observaciones: cotizacion.observaciones || "",
                });
              }
              setShowModal(true);
            }}
            icon="edit-secondary"
            size={24}
            style="secondary-outline"
          />
          <ButtonHeader
            title="Eliminar"
            onClick={() => console.log("Acciones")}
            icon="delete-primary"
            size={24}
            style="primary-outline"
          />
        </div>
      </div>

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
          {/* <ProductListCard
            title="Productos de la categoría"
            items={productosData?.content || []}
            currentPage={productosData?.number || 0}
            totalPages={productosData?.totalPages || 1}
            onPageChange={(page) => setCurrentPage(page)}
          /> */}

          <div className={styles.card}>
            <div className={styles.subtitle}>Productos de la cotización</div>

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
      {showModal && (
        <ModalObservacion
          show={showModal}
          cotizacion={selectedCotizacion}
          onClose={() => setShowModal(false)}
          onSubmit={handleSaveObservacion}
        />
      )}
    </div>
  );
}

export default CotizacionDetalle;
