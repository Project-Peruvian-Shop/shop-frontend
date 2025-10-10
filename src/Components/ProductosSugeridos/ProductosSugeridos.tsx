import { useEffect, useState } from "react";
import styles from "./ProductosSugeridos.module.css";
import { routes } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
import { getSugeridos } from "../../services/producto.service";
import type { PaginatedProductoResponseDTO } from "../../models/Producto/Producto_response_dto";
import ProductCard from "../shop/card/ProductCard";
import { addToCart } from "../../utils/cartUtils";

interface ProductosSugeridosProps {
  producto: number;
  categoria: number;
}

function ProductosSugeridos(props: ProductosSugeridosProps) {
  const navigate = useNavigate();
  const { producto, categoria } = props;

  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState<PaginatedProductoResponseDTO[]>(
    []
  );

  useEffect(() => {
    if (!producto || !categoria) {
      navigate(routes.shop);
      return;
    }

    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await getSugeridos(producto, categoria);
        setProductos(response);
      } catch (err) {
        console.error("Error cargando producto:", err);
        navigate(routes.shop);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [producto, categoria, navigate]);

  const handleAddToCart = async (producto: PaginatedProductoResponseDTO) => {
    const redirect = await addToCart(producto);

    if (redirect) {
      navigate(routes.shop_cart);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.usosContainer}>
        <div className={styles.subtitle}>Productos sugeridos:</div>
        {loading ? (
          <div>Cargando...</div>
        ) : productos.length === 0 ? (
          <div>No hay productos sugeridos disponibles.</div>
        ) : (
          <div className={styles.productosGrid}>
            {productos.map((producto) => (
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
        )}
      </div>
    </div>
  );
}

export default ProductosSugeridos;
