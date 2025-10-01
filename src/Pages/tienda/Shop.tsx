import { useEffect, useState } from "react";
import Products from "../../Components/shop/products/Products";
import Sidebar from "../../Components/shop/sidebar/Sidebar";
import SubHeader from "../../Components/shop/subheader/SubHeader";
import { mockSidebar } from "../../utils/mock";
import styles from "./Shop.module.css";
import { getPaginatedProductos } from "../../services/producto.service";
import type { PaginatedResponse } from "../../services/global.interfaces";
import type { PaginatedProductoResponseDTO } from "../../models/Producto/Producto_response_dto";

const Shop = () => {
  const [pageData, setPageData] =
    useState<PaginatedResponse<PaginatedProductoResponseDTO> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await getPaginatedProductos(page, 9);
        setPageData(response);
      } catch (err) {
        console.error("Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [page]);

  return (
    <>
      <SubHeader />

      <div className={styles.shopContainer}>
        <Sidebar arrayCategories={mockSidebar.arrayCategories} />

        <div className={styles.productsSection}>
          {loading ? (
            <p>Cargando productos...</p>
          ) : (
            <>
              {pageData && <Products result={pageData.content} />}

              {/* 🔹 Paginador abajo */}
              {pageData && (
                <div className={styles.pagination}>
                  <button
                    disabled={pageData.first}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Anterior
                  </button>
                  <span>
                    Página {pageData.number + 1} de {pageData.totalPages}
                  </span>
                  <button
                    disabled={pageData.last}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
