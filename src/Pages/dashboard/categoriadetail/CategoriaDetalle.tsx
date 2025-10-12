import { useNavigate, useParams } from "react-router-dom";
import styles from "./CategoriaDetalle.module.css";
import { useEffect, useState } from "react";
import { routes } from "../../../utils/routes";
import {
  getCategoryById,
  getProductosByCategoryId,
  updateCategoria,
} from "../../../services/categoria.service";
import type {
  CategoriaDashboardDTO,
  ProductoResponseDTO,
} from "../../../models/Categoria/Categoria_response";
import ButtonHeader from "../../../Components/dashboard/buttonheader/ButtonHeader";
import InfoCard from "../../../Components/dashboard/infocard/InfoCard";
import ProductListCard from "../../../Components/dashboard/productlistcard/ProductListCard";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createImagen } from "../../../services/imagen.service";
import ModalCategoriaEdit from "../../../Components/dashboard/Modals/Categoria/ModalCategoriaEdit";

function CategoriaDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<CategoriaDashboardDTO | null>(
    null
  );
  const [productosData, setProductosData] =
    useState<PaginatedResponse<ProductoResponseDTO> | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const MySwal = withReactContent(Swal);

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
        const data = await getProductosByCategoryId(Number(id), page);
        setProductosData(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProductos(currentPage);
  }, [id, currentPage]);

  const uploadImagen = async (
    file: File | null,
    defaultID = 2
  ): Promise<number> => {
    if (!file) return categoria?.imagenId ?? defaultID;

    const enlace = URL.createObjectURL(file);
    const imagenData = {
      enlace,
      nombre: file.name,
      alt: file.name.replace(/\s+/g, "-"),
    };

    const imagenResponse = await createImagen(imagenData);
    return imagenResponse.id;
  };
  const handleEditCategoria = async (data: {
    nombre: string;
    norma: string;
    usos: string;
    imagenFile: File | null;
  }) => {
    if (!categoria) return;

    // Verificación si hay cambios
    if (
      data.nombre === categoria.nombre &&
      data.norma === categoria.norma &&
      data.usos === categoria.usos &&
      data.imagenFile === null
    ) {
      MySwal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "No has realizado ninguna modificación.",
      });
      return;
    }
    try {
      const imagenID = await uploadImagen(data.imagenFile);
      const body = {
        nombre: data.nombre,
        norma: data.norma,
        usos: data.usos,
        imagenId: imagenID,
      };
      const response = await updateCategoria(categoria.id, body);
      if (response) {
        MySwal.fire({
          icon: "success",
          title: "¡Categoría editada!",
          text: "La categoría ha sido editada exitosamente.",
        });
        const updatedCategoria = await getCategoryById(categoria.id);
        setCategoria(updatedCategoria);
        setShowEditModal(false);
      }
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : String(error);
      MySwal.fire({
        icon: "error",
        title: "Error al editar la categoría",
        text: mensaje,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Categoría {categoria?.norma}</div>
        <div className={styles.actions}>
          <ButtonHeader
            title="Editar"
            onClick={() => setShowEditModal(true)}
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
      {showEditModal && categoria && (
        <ModalCategoriaEdit
          categoria={categoria}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditCategoria}
        />
      )}
    </div>
  );
}

export default CategoriaDetalle;
