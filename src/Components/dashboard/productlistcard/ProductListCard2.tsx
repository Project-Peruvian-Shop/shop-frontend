import React from "react";
import styles from "./ProductListCard.module.css";
import Pagination from "../../pagination/Pagination";
import type { ProductoCarritoDetalleDTO } from "../../../models/CotizacionDetalle/Cotizacion_detalle";

interface ProductListCardProps {
  title: string;
  items: ProductoCarritoDetalleDTO[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductListCard2: React.FC<ProductListCardProps> = ({
  title,
  items,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.subtitle}>{title}</div>
      <div className={styles.productList}>
        {items.map((item) => (
          <div className={styles.productItem} key={item.id}>
            <img
              src={item.imagenEnlace}
              alt={item.imagenAlt}
              className={styles.productImage}
            />
            <span className={styles.productName}>{item.nombre}</span>
            {item.cantidad !== undefined && (
              <span className={styles.productCantidad}>{item.cantidad}</span>
            )}
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProductListCard2;
