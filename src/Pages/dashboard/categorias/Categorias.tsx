import { useEffect, useState } from "react";
import type { CategoriaDashboardDTO } from "../../../models/Categoria/Categoria_response";
import styles from "./Categorias.module.css";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import {
  createCategoria,
  getAllCategories,
  getQuantityCategorias,
} from "../../../services/categoria.service";
import type { Action, Column } from "../../../Components/table/DashboardTable";
import DashboardTable from "../../../Components/table/DashboardTable";
import { useNavigate } from "react-router-dom";
import IconSVG from "../../../Icons/IconSVG";
import ModalCategoriaCreate from "../../../Components/dashboard/Modals/Categoria/ModalCategoriaCreate";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createImagen } from "../../../services/imagen.service";
function Categorias() {
  const [categorias, setCategorias] = useState<CategoriaDashboardDTO[]>([]);
  const [cantidad, setCantidad] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  //const[categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaDashboardDTO | null>(null);
  
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    loadCategorias(page);
    loadCantidadCategorias();
  }, [page]);

  const loadCategorias = async (page: number) => {
    try {
      const res: PaginatedResponse<CategoriaDashboardDTO> =
        await getAllCategories(page, 10);
      setCategorias(res.content);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error cargando categorias:", error);
    }
  };

  const loadCantidadCategorias = async () => {
    try {
      const cantidadCategorias = await getQuantityCategorias();
      setCantidad(cantidadCategorias);
    } catch (error) {
      console.error("Error cargando cantidad de categorias:", error);
    }
  };
  interface CategoriaFormData{
    nombre: string;
    norma: string;
    usos: string;
    imagenFile: File | null;
  }
  const uploadImagen = async (file: File | null, defaultID = 2): Promise<number> => {
		if (!file) return defaultID;

		const enlace = URL.createObjectURL(file);
		const imagenData = {
			enlace,
			nombre: file.name,
			alt: file.name.replace(/\s+/g, "-"),
		};

		const imagenResponse = await createImagen(imagenData);
		return imagenResponse.id;
	};
  const handleAddCategoria = async (data: CategoriaFormData) => {
    try {
          const imagenID = await uploadImagen(data.imagenFile);
          const body = {
            nombre: data.nombre,
            norma: data.norma,
            usos: data.usos,
            imagenId: imagenID,
          };
    
          const response = await createCategoria(body);
          if (response) {
            MySwal.fire({
              icon: "success",
              title: "¡Categoría creada!",
              text: "La categoría ha sido creada exitosamente.",
            });
            setShowModal(false);
            await loadCategorias(page);
            await loadCantidadCategorias();
          }
        } catch (error: unknown) {
          const mensaje = error instanceof Error ? error.message : String(error);
          MySwal.fire({
            icon: "error",
            title: "Error al crear el producto",
            text: mensaje,
          });
        }
  }

  // Definición de columnas
  const columns: Column<CategoriaDashboardDTO>[] = [
    {
      header: "Nombre",
      accessor: "nombre",
      render: (_, row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={row.imagenEnlace}
            alt={row.imagenAlt}
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
          <span>{row.nombre}</span>
        </div>
      ),
    },
    { header: "Norma", accessor: "norma" },
    { header: "Usos", accessor: "usos" },
  ];

  // Acciones con iconos
  const actions: Action<CategoriaDashboardDTO>[] = [
    {
      label: "Ver",
      icon: <IconSVG name="view-secondary" size={20} />,
      onClick: (row) => {
        console.log("Ver categoria", row);
        navigate(`/dashboard/category/${row.id}`);
      },
    },
    {
      label: "Editar",
      icon: <IconSVG name="edit-secondary" size={20} />,
      onClick: async (row) => {
        const producto = (row.id);
        console.log(producto);
        setShowEditModal(true);
      },
    },
    {
      label: "Eliminar",
      icon: <IconSVG name="delete-secondary" size={20} />,
      onClick: (row) => console.log("Eliminar categoria", row),
    },
  ];

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <div className={styles.title}>Categorías</div>

        <div className={styles.headerActions}>
          <div className={styles.totalProducts}>
            Total: {cantidad} Categorías
          </div>
          <button className={styles.addButton} onClick={() => setShowModal(true)}>
            + Añadir Categoría
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <DashboardTable
          columns={columns}
          data={categorias}
          actions={actions}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
      {showModal && (
      <ModalCategoriaCreate
          onClose={() => setShowModal(false)}
          onSubmit={handleAddCategoria}
        />
      )}
      {showEditModal && (
        <p>owo</p>
        )}
    </div>
  );
}
export default Categorias;
