import type { PaginatedProductoResponseDTO } from "../../../models/Producto/Producto_response_dto";
import { saveProductoToCart } from "../../../utils/localStorage";
import { routes } from "../../../utils/routes";
import ProductCard from "../card/ProductCard";
import styles from "./Products.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface ProductsProps {
  result: PaginatedProductoResponseDTO[];
}

const addToCart = (producto: PaginatedProductoResponseDTO) => {
  const MySwal = withReactContent(Swal);

  console.log(`Producto ${producto.id} añadido al carrito`);
  saveProductoToCart(producto, 1);

  MySwal.fire({
    icon: "success",
    title: "¡Producto agregado!",
    text: `Se agregó 1 unidad al carrito.`,
    timer: 2000,
    showConfirmButton: false,
  });
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
