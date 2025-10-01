import type { PaginatedProductoResponseDTO } from "../../../Dashboard/models/Producto/Producto_response_dto";
import ProductCard from "../card/ProductCard";
import styles from "./Products.module.css";

interface ProductsProps {
  result: PaginatedProductoResponseDTO[];
}

function Products(props: ProductsProps) {
  return (
    <div className={styles.productsContainer}>
      <div className={styles.productsCount}>Mostrando {props.result.length} productos</div>

      <div className={styles.productsList}>
        {props.result.map((producto) => (
          <ProductCard
            key={producto.id}
            link={`/producto/${producto.id}`}
            img={producto.imagenUrl}
            title={producto.nombre}
            alt={producto.imagenAlt}
            click={() => alert("Funcionalidad en desarrollo")}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
