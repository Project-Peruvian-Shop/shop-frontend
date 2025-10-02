import type { PaginatedProductoResponseDTO } from "../../../models/Producto/Producto_response_dto";
import { saveProductoToCart } from "../../../utils/localStorage";
import { routes } from "../../../utils/routes";
import ProductCard from "../card/ProductCard";
import styles from "./Products.module.css";

interface ProductsProps {
  result: PaginatedProductoResponseDTO[];
}

const addToCart = (producto: PaginatedProductoResponseDTO) => {
  console.log(`Producto ${producto.id} añadido al carrito`);
  saveProductoToCart(producto, 1);
};

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
            click={() => addToCart(producto)}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
