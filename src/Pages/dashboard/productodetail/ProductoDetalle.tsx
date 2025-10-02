import { useNavigate, useParams } from "react-router-dom";
import type { ProductoDTO } from "../../../models/Producto/Producto_response_dto";
import styles from "./ProductoDetalle.module.css";
import { useEffect, useState } from "react";
import { getProductoById } from "../../../services/producto.service";
import { routes } from "../../../utils/routes";

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
        <div className={styles.title}>
          Producto {"Tuberias para Alcantarillado 110mm UF"}
        </div>
        <div className={styles.actions}>
          <button className={styles.editButton}>Editar</button>
          <button className={styles.deleteButton}>Eliminar</button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.subtitle}>Datos del Producto</div>
            <div className={styles.infoRow}>
              <span className={styles.label}>ID:</span>
              <span className={styles.value}>{producto?.id}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Nombre:</span>
              <span className={styles.value}>{producto?.nombre}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Categoría:</span>
              <span className={styles.value}>{producto?.categoriaNombre}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Descripción:</span>
              <span className={styles.value}>
                {producto?.descripcion}
                duradera.
              </span>
            </div>
          </div>

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
