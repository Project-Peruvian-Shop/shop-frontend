import styles from "./CotizacionDetalle.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../utils/routes";
import InfoCard from "../../../Components/dashboard/infocard/InfoCard";
import { useCallback, useEffect, useState } from "react";
import type {
  CotizacionDashboardDTO,
  CotizacionFullDTO,
} from "../../../models/Cotizacion/Cotizacion_response_dto";
import {
  change_state,
  getCotizacionById,
  updateObservacionCotizacion,
  uploadCotizacionPDF,
} from "../../../services/cotizacion.service";
import ButtonHeader from "../../../Components/dashboard/buttonheader/ButtonHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalObservacionEstado from "../../../Components/dashboard/Modals/Cotizaciones/ModalObservacionesEstado";
import upload from "../../../Icons/Modal_uploadPDF/upload_pdf.svg";
function CotizacionDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [cotizacion, setCotizacion] = useState<CotizacionFullDTO | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalPDF, setShowModalPDF] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] =
    useState<CotizacionDashboardDTO | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const MySwal = withReactContent(Swal);
  // const [productosData, setProductosData] =
  //   useState<PaginatedResponse<ProductoResponseDTO> | null>(null);
  // const [currentPage, setCurrentPage] = useState(0);
  // const pageSize = 6;

  const fetchCotizacion = useCallback(
    async (cotizacionId: number) => {
      try {
        const data = await getCotizacionById(cotizacionId);
        setCotizacion(data);
      } catch (error) {
        console.error("Error al obtener la cotización:", error);
        navigate(routes.profile_user);
      }
    },
    [navigate]
  );
  useEffect(() => {
    if (!id) {
      navigate(routes.shop);
      return;
    }
    fetchCotizacion(Number(id));
  }, [id, navigate, fetchCotizacion]);

  const mapperEstado = (estado: string) => {
    switch (estado) {
      case "PENDIENTE":
        return { label: "Pendiente", className: styles.pendiente };
      case "EN_PROCESO":
        return { label: "En proceso", className: styles.enProceso };
      case "ENVIADA":
        return { label: "Enviada", className: styles.enviada };
      case "ACEPTADA":
        return { label: "Aceptada", className: styles.aceptada };
      case "RECHAZADA":
        return { label: "Rechazada", className: styles.rechazada };
      case "CERRADA":
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
      await fetchCotizacion(id);

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
  const handleChangeEstado = async (
    id: number,
    nuevoEstado:
      | "PENDIENTE"
      | "EN_PROCESO"
      | "ENVIADA"
      | "ACEPTADA"
      | "RECHAZADA"
      | "CERRADA"
  ) => {
    try {
      await change_state(id, nuevoEstado);
      await fetchCotizacion(cotizacion?.id || id);
      setShowModal(false);
      await MySwal.fire({
        title: "Estado actualizado",
        icon: "success",
        text: `El estado se cambió correctamente.`,
      });
    } catch (error) {
      console.error(error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el estado de la cotización",
      });
    }
  };
  const handleUpload = async () => {
    if (!selectedFile || !cotizacion) return;

    try {
      await uploadCotizacionPDF(cotizacion.id, selectedFile);
      await fetchCotizacion(cotizacion.id); // 👈 actualiza la vista con el nuevo enlace
      setSelectedFile(null);

      Swal.fire({
        icon: "success",
        title: "PDF subido",
        text: "La cotización fue actualizada con el PDF.",
      });
    } catch (error) {
      console.error("Error al subir PDF:", error);
      Swal.fire({
        icon: "error",
        title: "Error al subir PDF",
        text: "No se pudo subir el archivo. Intenta nuevamente.",
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
                value: (
                  <span
                    className={mapperEstado(cotizacion?.estado || "").className}
                  >
                    {mapperEstado(cotizacion?.estado || "").label}
                  </span>
                ),
              },
              {
                label: "Fecha de cotización:",
                value: cotizacion?.creacion
                  ? new Date(cotizacion.creacion).toLocaleDateString("es-PE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "",
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

            <div className={styles.titlePDF}>PDF de la cotización</div>

            {cotizacion?.cotizacionEnlace ? (
              <div className={styles.pdfContainer}>
                <a
                  href={cotizacion.cotizacionEnlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pdfButton}
                >
                  Ver PDF
                </a>
                <a
                  className={styles.pdfButton}
                  onClick={async () => {
                    const response = await fetch(cotizacion.cotizacionEnlace!);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `cotizacion-${cotizacion.numero}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                  }}
                >
                  Descargar PDF
                </a>
              </div>
            ) : (
              <>
                <div className={styles.noPdf}>
                  <p>No se ha subido ningún PDF aún.</p>
                  <button
                    className={styles.addButton}
                    onClick={() => setShowModalPDF(true)}
                  >
                    Seleccionar archivo
                  </button>
                </div>
                {/* Modal para subir un PDF */}
                {showModalPDF && (
                  <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                      <h2>Subir PDF de cotización</h2>

                      {/* Si NO hay PDF seleccionado, mostramos dropzone */}
                      {!selectedFile ? (
                        <div
                          className={styles.dropZone}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file && file.type === "application/pdf") {
                              setSelectedFile(file);
                              setPdfPreview(URL.createObjectURL(file));
                            }
                          }}
                          onClick={() =>
                            document.getElementById("fileInput")?.click()
                          }
                        >
                          <div className={styles.uploadIcon}>
                            <img src={upload} alt="Subir archivo" />
                            <p>Arrastra o haz clic para subir PDF</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Texto sobre la vista previa */}
                          <div className={styles.previewHeader}>
                            <p>
                              Vista previa del PDF: {selectedFile.name}
                            </p>
                          </div>

                          {/* Vista previa */}
                          {pdfPreview && (
                            <div className={styles.pdfPreview}>
                              <embed
                                src={pdfPreview}
                                type="application/pdf"
                                width="100%"
                                height="400px"
                              />
                            </div>
                          )}
                        </>
                      )}

                      <input
                        id="fileInput"
                        type="file"
                        accept="application/pdf"
                        className={styles.fileInput}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && file.type === "application/pdf") {
                            setSelectedFile(file);
                            setPdfPreview(URL.createObjectURL(file));
                          }
                        }}
                      />

                      <div className={styles.modalActions}>
                        <button
                          onClick={handleUpload}
                          disabled={!selectedFile}
                          className={styles.addButton}
                        >
                          Subir PDF
                        </button>
                        <button
                          type="button"
                          className={styles.cancelButton}
                          onClick={() => {
                            setShowModalPDF(false);
                            setSelectedFile(null);
                            setPdfPreview(null);
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <ModalObservacionEstado
          show={showModal}
          cotizacion={selectedCotizacion}
          onClose={() => setShowModal(false)}
          onSaveObservacion={handleSaveObservacion}
          onChangeEstado={handleChangeEstado}
        />
      )}
    </div>
  );
}
export default CotizacionDetalle;
