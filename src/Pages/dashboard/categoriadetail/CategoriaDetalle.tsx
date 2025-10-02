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
import ButtonHeader from "../../../Components/dashboard/buttonheader/ButtonHeader";
import InfoCard from "../../../Components/dashboard/infocard/InfoCard";
import ProductListCard from "../../../Components/dashboard/productlistcard/ProductListCard";
import type { PaginatedResponse } from "../../../services/global.interfaces";

function CategoriaDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<CategoriaDashboardDTO | null>(
    null
  );
  const [productosData, setProductosData] =
    useState<PaginatedResponse<ProductoResponseDTO> | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
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
        setProductosData(data);
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
          <InfoCard
            title="Datos de la Categoría"
            items={[
              { label: "ID:", value: categoria?.id || "0" },
              { label: "Nombre:", value: categoria?.nombre || "" },
              { label: "Norma:", value: categoria?.norma || "" },
              { label: "Usos:", value: categoria?.usos || "" },
            ]}
          />

          <ProductListCard
            title="Productos de la categoría"
            items={productosData?.content || []}
            currentPage={productosData?.number || 0}
            totalPages={productosData?.totalPages || 1}
            onPageChange={(page) => setCurrentPage(page)}
          />
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
