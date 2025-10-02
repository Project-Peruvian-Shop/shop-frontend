import { useNavigate, useParams } from "react-router-dom";
import type { ProductoDTO } from "../../../models/Producto/Producto_response_dto";
import styles from "./ProductoDetalle.module.css";
import { useEffect, useState } from "react";
import { getProductoById } from "../../../services/producto.service";
import { routes } from "../../../utils/routes";
import ButtonHeader from "../../../Components/dashboard/buttonheader/ButtonHeader";
import InfoCard from "../../../Components/dashboard/infocard/InfoCard";

function ProductoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [producto, setProducto] = useState<ProductoDTO | null>(null);

  useEffect(() => {
    if (!id) {
      navigate(routes.dashboard);
      return;
    }

    const fetchProducto = async (id: string) => {
      try {
        const data = await getProductoById(Number(id));
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        navigate(routes.dashboard_products);
      }
    };

    fetchProducto(id);
  }, [id, navigate]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Producto {producto?.nombre}</div>
        <div className={styles.actions}>
          <ButtonHeader
            title="Editar"
            onClick={() => console.log("Acciones")}
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
            title="Datos del Producto"
            items={[
              { label: "ID:", value: producto?.id || "0" },
              { label: "Nombre:", value: producto?.nombre || "" },
              { label: "Categoría:", value: producto?.categoriaNombre || "" },
              { label: "Descripción:", value: producto?.descripcion || "" },
            ]}
          />

          <div className={styles.card}>
            <div className={styles.subtitle}>Detalles técnicos</div>

            <div className={styles.infoRow}>
              <span className={styles.label}>Norma:</span>
              <span className={styles.value}>{producto?.categoriaNombre}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>Usos:</span>
              <span className={styles.value}>{producto?.categoriaUsos}</span>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <img
            src={producto?.productoEnlace}
            alt={producto?.productoAlt}
            className={styles.productImage}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
