import { useNavigate } from "react-router-dom";
import type { PaginatedProductoResponseDTO } from "../../../models/Producto/Producto_response_dto";
import { routes } from "../../../utils/routes";
import ProductCard from "../card/ProductCard";
import styles from "./Products.module.css";
import { addToCart } from "../../../utils/cartUtils";

interface ProductsProps {
  result: PaginatedProductoResponseDTO[];
}

function Products(props: ProductsProps) {
  const navigate = useNavigate();

  const handleAddToCart = async (producto: PaginatedProductoResponseDTO) => {
    const redirect = await addToCart(producto);

    if (redirect) {
      navigate(routes.shop_cart);
    }
  };

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
            click={() => handleAddToCart(producto)}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
