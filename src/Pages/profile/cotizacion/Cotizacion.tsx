import styles from "./Cotizacion.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../utils/routes";
import Header from "../../../Components/header/Header";
import { useEffect, useState } from "react";
import type { CotizacionFullDTO } from "../../../models/Cotizacion/Cotizacion_response_dto";
import { getCotizacionById } from "../../../services/cotizacion.service";
import InfoCard from "../../../Components/dashboard/infocard/InfoCard";
import ButtonPrimary from "../../../Components/buttons/ButtonPrimary";
// import ProductListCard from "../../Components/dashboard/productlistcard/ProductListCard";
// import type { ProductoResponseDTO } from "../../models/Categoria/Categoria_response";
// import type { PaginatedResponse } from "../../services/global.interfaces";

function Cotizacion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [cotizacion, setCotizacion] = useState<CotizacionFullDTO | null>(null);
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
      case "PENDIENTE":
        return { label: "Pendiente", className: styles.sinAtender };
      case "EN_PROCESO":
        return { label: "En proceso", className: styles.enviada };
      case "RESPONDIDA":
        return { label: "Respondida", className: styles.enviada };
      case "CERRADA":
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
                value: cotizacion
                  ? `${cotizacion.tipoDocumento ?? ""}${
                      cotizacion.documento ? " - " + cotizacion.documento : ""
                    }`
                  : "",
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

      {/* 🔙 Botón Regresar */}
      <div className={styles.backContainer}>
        <ButtonPrimary
          text="Regresar a mi perfil"
          click={() => navigate(routes.profile_user)}
        />
      </div>
    </div>
  );
}

export default Cotizacion;
