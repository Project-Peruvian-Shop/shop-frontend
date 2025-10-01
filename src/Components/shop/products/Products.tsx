import type { PaginatedProductoResponseDTO } from "../../../models/Producto/Producto_response_dto";
import { routes } from "../../../utils/routes";
import ProductCard from "../card/ProductCard";
import styles from "./Products.module.css";

interface ProductsProps {
  result: PaginatedProductoResponseDTO[];
}

function Products(props: ProductsProps) {
  return (
    <div className={styles.productsContainer}>
      <div className={styles.productsCount}>
        Mostrando {props.result.length} productos
      </div>

      <div className={styles.productsList}>
        {props.result.map((producto) => (
          <ProductCard
            key={producto.id}
            link={`${routes.product}${producto.id}`}
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
