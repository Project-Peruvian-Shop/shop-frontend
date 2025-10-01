import { useEffect, useState } from "react";
import SubHeader from "../../Components/shop/subheader/SubHeader";
import styles from "./Producto.module.css";
import { getProductoById } from "../../services/producto.service";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../utils/routes";
import type { ProductoDTO } from "../../models/Producto/Producto_response_dto";

const Producto = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [producto, setProducto] = useState<ProductoDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate(routes.shop);
      return;
    }

    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await getProductoById(Number(id));
        setProducto(response);
      } catch (err) {
        console.error("Error cargando producto:", err);
        navigate(routes.NotFound);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id, navigate]);

  return (
    <>
      <SubHeader />
      <div className={styles.productoContainer}>
        {loading ? (
          <p>Cargando producto...</p>
        ) : producto ? (
          <div className={styles.productoCard}>
            <h1>{producto.nombre}</h1>
            <img
              src={producto.productoEnlace}
              alt={producto.productoAlt}
              className={styles.productoImagen}
            />
            <p>{producto.descripcion}</p>
            <div className={styles.categoria}>
              <h3>Categoría: {producto.categoria}</h3>
              <img
                src={producto.categoriaEnlace}
                alt={producto.categoriaAlt}
                className={styles.categoriaImagen}
              />
              <p>{producto.categoriaUsos}</p>
            </div>
          </div>
        ) : (
          <p>No se encontró el producto</p>
        )}
      </div>
    </>
  );
};

export default Producto;
