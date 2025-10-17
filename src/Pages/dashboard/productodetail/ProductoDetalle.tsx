import { useNavigate, useParams } from "react-router-dom";
import type { ProductoDTO } from "../../../models/Producto/Producto_response_dto";
import styles from "./ProductoDetalle.module.css";
import { useEffect, useState } from "react";
import { getProductoById } from "../../../services/producto.service";
import { routes } from "../../../utils/routes";
import ButtonHeader from "../../../Components/dashboard/buttonheader/ButtonHeader";
import InfoCard from "../../../Components/dashboard/infocard/InfoCard";
import ModalProductoEdit from "../../../Components/dashboard/Modals/Producto/ModalProductoEdit";
import type { CategoriaDashboardDTO } from "../../../models/Categoria/Categoria_response";
import { getAllCategories } from "../../../services/categoria.service";
import { updateProducto } from "../../../services/producto.service";
import { createImagen } from "../../../services/imagen.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ProductoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [producto, setProducto] = useState<ProductoDTO | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categorias, setCategorias] = useState<CategoriaDashboardDTO[]>([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const loadCategorias = async () => {
      const res = await getAllCategories(0, 20);
      setCategorias(res.content);
    };
    loadCategorias();
  }, []);

  useEffect(() => {
    if (!id) {
      navigate(routes.dashboard);
      return;
    }

    const fetchProducto = async (id: string) => {
      try {
        const data = await getProductoById(Number(id));
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        navigate(routes.dashboard_products);
      }
    };

    fetchProducto(id);
  }, [id, navigate]);
  const uploadImagen = async (
    file: File | null,
    defaultID = 2
  ): Promise<number> => {
    if (!file) return producto?.imagenId ?? defaultID;

    const formData = new FormData();
    formData.append("file", file);

    const imagenResponse = await createImagen(formData);
    return imagenResponse.id;
  };
  const handleEditProduct = async (data: {
    nombre: string;
    descripcion: string;
    categoriaID: number;
    imagenFile: File | null;
  }) => {
    if (!producto) return;

    const noHayCambios =
      data.nombre === producto.nombre &&
      data.descripcion === producto.descripcion &&
      data.categoriaID === producto.categoriaId &&
      data.imagenFile === null;

    if (noHayCambios) {
      MySwal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "No se ha modificado ningún campo.",
      });
      return;
    }

    try {
      const imagenID = await uploadImagen(data.imagenFile);

      const body = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        categoriaID: data.categoriaID,
        imagenID: imagenID,
      };

      await updateProducto(producto.id, body);
      MySwal.fire({
        icon: "success",
        title: "Producto actualizado",
        text: "Los cambios se guardaron correctamente.",
      });

      // Volver a traer los datos actualizados
      const updated = await getProductoById(producto.id);
      setProducto(updated);

      setShowEditModal(false);
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : String(error);
      MySwal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: mensaje,
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Producto {producto?.nombre}</div>
        <div className={styles.actions}>
          <ButtonHeader
            title="Editar"
            onClick={() => {
              setShowEditModal(true);
            }}
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
            title="Datos del Producto"
            items={[
              { label: "ID:", value: producto?.id || "0" },
              { label: "Nombre:", value: producto?.nombre || "" },
              { label: "Categoría:", value: producto?.categoriaNombre || "" },
              { label: "Descripción:", value: producto?.descripcion || "" },
            ]}
          />

          <InfoCard
            title="Detalles técnicos"
            items={[
              { label: "Norma:", value: producto?.categoriaNombre || "" },
              { label: "Usos:", value: producto?.categoriaUsos || "" },
            ]}
          />
        </div>
        <div className={styles.right}>
          <img
            src={producto?.productoEnlace}
            alt={producto?.productoAlt}
            className={styles.productImage}
          />
        </div>
      </div>
      {showEditModal && producto && (
        <>
          {console.log("✅ Modal se está intentando renderizar")}
          <ModalProductoEdit
            producto={producto}
            categorias={categorias}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEditProduct}
          />
        </>
      )}
    </div>
  );
}

export default ProductoDetalle;
