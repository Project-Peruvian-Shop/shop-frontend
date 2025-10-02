import { useNavigate } from "react-router-dom";
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

function Products(props: ProductsProps) {
  const navigate = useNavigate();

  const addToCart = (producto: PaginatedProductoResponseDTO) => {
    const MySwal = withReactContent(Swal);

    console.log(`Producto ${producto.id} añadido al carrito`);
    saveProductoToCart(producto, 1);

    MySwal.fire({
      icon: "success",
      title: "¡Producto agregado!",
      text: `Se agregó 1 unidad al carrito.`,
      timer: 2000,
      showCancelButton: true,
      confirmButtonText: "Ir al carrito",
      cancelButtonText: "Seguir comprando",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(routes.shop_cart);
      }
    });
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
            click={() => addToCart(producto)}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
