import { useEffect, useState } from "react";
import Products from "../../Components/shop/products/Products";
import Sidebar from "../../Components/shop/sidebar/Sidebar";
import SubHeader from "../../Components/shop/subheader/SubHeader";
import { mockSidebar } from "../../utils/mock";
import styles from "./Shop.module.css";
import { getPaginatedProductos } from "../../services/producto.service";
import type { PaginatedProductoResponseDTO } from "../../models/Producto/Producto_response_dto";

const Shop = () => {
  const [productos, setProductos] = useState<PaginatedProductoResponseDTO[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await getPaginatedProductos(0, 10);
        setProductos(response.content);
      } catch (err) {
        console.error("Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <>
      <SubHeader />

      <div className={styles.shopContainer}>
        <Sidebar arrayCategories={mockSidebar.arrayCategories} />

        <div className={styles.productsSection}>
          {loading ? (
            <p>Cargando productos...</p>
          ) : (
            <Products result={productos} />
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
