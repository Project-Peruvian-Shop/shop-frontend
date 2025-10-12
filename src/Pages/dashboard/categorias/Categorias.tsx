import { useEffect, useState } from "react";
import type { CategoriaDashboardDTO } from "../../../models/Categoria/Categoria_response";
import styles from "./Categorias.module.css";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import {
  createCategoria,
  getAllCategories,
  getCategoryById,
  getQuantityCategorias,
  getSearchCategories,
  updateCategoria,
} from "../../../services/categoria.service";
import type {
  Action,
  Column,
} from "../../../Components/dashboard/table/DashboardTable";
import DashboardTable from "../../../Components/dashboard/table/DashboardTable";
import { useNavigate } from "react-router-dom";
import IconSVG from "../../../Icons/IconSVG";
import ModalCategoriaCreate from "../../../Components/dashboard/Modals/Categoria/ModalCategoriaCreate";
import ModalCategoriaEdit from "../../../Components/dashboard/Modals/Categoria/ModalCategoriaEdit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createImagen } from "../../../services/imagen.service";
import SearchBar from "../../../Components/dashboard/searchbar/SearchBar";

function Categorias() {
  const [categorias, setCategorias] =
    useState<PaginatedResponse<CategoriaDashboardDTO>>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [cantidad, setCantidad] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<CategoriaDashboardDTO | null>(null);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchAll();
    loadCantidadCategorias();
  }, []);

  useEffect(() => {
    if (search.length === 0) {
      fetchAll();
    } else if (search.length >= 3) {
      const delay = setTimeout(() => {
        fetchSearch(search);
      }, 400);
      return () => clearTimeout(delay);
    }
  }, [search]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setCategorias(res);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearch = async (text: string) => {
    setLoading(true);
    try {
      const res = await getSearchCategories(text);
      setCategorias(res);
    } finally {
      setLoading(false);
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

  interface CategoriaFormData {
    nombre: string;
    norma: string;
    usos: string;
    imagenFile: File | null;
  }

  const uploadImagen = async (
    file: File | null,
    defaultID = 2
  ): Promise<number> => {
    if (!file) return categoriaSeleccionada?.imagenId ?? defaultID;

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
  };

  const handleEditCategoria = async (data: CategoriaFormData) => {
    if (!categoriaSeleccionada) return;

    // Verificación si hay cambios
    if (
      data.nombre === categoriaSeleccionada.nombre &&
      data.norma === categoriaSeleccionada.norma &&
      data.usos === categoriaSeleccionada.usos &&
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
      const response = await updateCategoria(categoriaSeleccionada.id, body);
      if (response) {
        MySwal.fire({
          icon: "success",
          title: "¡Categoría editada!",
          text: "La categoría ha sido editada exitosamente.",
        });
        setShowEditModal(false);
        await loadCantidadCategorias();
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
        const categoria = await getCategoryById(row.id);
        setCategoriaSeleccionada(categoria);
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

        <div className={styles.searchBarContainer}>
          <SearchBar
            placeholder="Buscar categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.headerActions}>
          <div className={styles.totalProducts}>
            Total: {cantidad} Categorías
          </div>
          <button
            className={styles.addButton}
            onClick={() => setShowModal(true)}
          >
            + Añadir Categoría
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <DashboardTable
            columns={columns}
            data={categorias?.content || []}
            actions={actions}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>

      {showModal && (
        <ModalCategoriaCreate
          onClose={() => setShowModal(false)}
          onSubmit={handleAddCategoria}
        />
      )}

      {showEditModal && categoriaSeleccionada && (
        <ModalCategoriaEdit
          categoria={categoriaSeleccionada}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditCategoria}
        />
      )}
    </div>
  );
}
export default Categorias;
