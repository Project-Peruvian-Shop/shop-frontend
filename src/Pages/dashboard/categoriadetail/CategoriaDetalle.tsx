import { useNavigate, useParams } from "react-router-dom";
import styles from "./CategoriaDetalle.module.css";
import { useEffect, useState } from "react";
import { routes } from "../../../utils/routes";
import {
  getCategoryById,
  getProductosByCategoryId,
} from "../../../services/categoria.service";
import type {
  CategoriaDashboardDTO,
  ProductoResponseDTO,
} from "../../../models/Categoria/Categoria_response";
import Pagination from "../../../Components/pagination/Pagination";
import ButtonHeader from "../../../Components/dashboard/buttonheader/ButtonHeader";

function CategoriaDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<CategoriaDashboardDTO | null>(
    null
  );
  const [productos, setProductos] = useState<ProductoResponseDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    if (!id) {
      navigate(routes.dashboard);
      return;
    }

    const fetchCategoria = async (id: string) => {
      try {
        const data = await getCategoryById(Number(id));
        setCategoria(data);
      } catch (error) {
        console.error("Error al obtener la categoría:", error);
        navigate(routes.dashboard_products);
      }
    };

    fetchCategoria(id);
  }, [id, navigate]);

  useEffect(() => {
    if (!id) return;

    const fetchProductos = async (page: number) => {
      try {
        const data = await getProductosByCategoryId(Number(id), page, pageSize);
        setProductos(data.content); // suponiendo que tu respuesta tiene `content`
        setTotalPages(data.totalPages); // suponiendo que tu respuesta tiene `totalPages`
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProductos(currentPage);
  }, [id, currentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Categoría {categoria?.norma}</div>
        <div className={styles.actions}>
          <ButtonHeader
            title="Editar"
            onClick={() => console.log("Acciones")}
            icon="edit-secondary"
            size={24}
            style="secondary-outline"
          />
          <ButtonHeader
            title="Eliminar"
            onClick={() => console.log("Acciones")}
            icon="delete-primary"
            size={24}
            style="primary-outline"
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.subtitle}>Datos de la Categoría</div>
            <div className={styles.infoRow}>
              <span className={styles.label}>ID:</span>
              <span className={styles.value}>{categoria?.id}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Nombre:</span>
              <span className={styles.value}>{categoria?.nombre}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Norma:</span>
              <span className={styles.value}>{categoria?.norma}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Usos:</span>
              <span className={styles.value}>{categoria?.usos} duradera.</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.subtitle}>Productos de la categoría</div>

            <div className={styles.productsContainer}>
              {productos.map((prod) => (
                <div key={prod.id} className={styles.productItem}>
                  <img
                    src={prod.imagenUrl}
                    alt={prod.imagenAlt || prod.nombre}
                    className={styles.productImage}
                    width={50}
                  />
                  <div className={styles.productName}>{prod.nombre}</div>
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>

        <div className={styles.right}>
          <img
            src={categoria?.imagenEnlace}
            alt={categoria?.imagenAlt}
            className={styles.categoriaImage}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoriaDetalle;
