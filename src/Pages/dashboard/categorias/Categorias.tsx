import { useEffect, useState } from "react";
import type { CategoriaDashboardDTO } from "../../../models/Categoria/Categoria_response";
import styles from "./Categorias.module.css";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import { getAllCategories } from "../../../services/categoria.service";
import type { Action, Column } from "../../../Components/table/DashboardTable";
import DashboardTable from "../../../Components/table/DashboardTable";
import viewIcon from "../../../Icons/view-db.svg";
import editIcon from "../../../Icons/edit-db.svg";
import trashIcon from "../../../Icons/trash-db.svg";
import { useNavigate } from "react-router-dom";

function Categorias() {
  const [categorias, setCategorias] = useState<CategoriaDashboardDTO[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategorias(page);
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
      icon: <img src={viewIcon} alt="Ver" />,
      onClick: (row) => {
        console.log("Ver categoria", row);
        navigate(`/dashboard/category/${row.id}`);
      },
    },
    {
      label: "Editar",
      icon: <img src={editIcon} alt="Editar" />,
      onClick: (row) => console.log("Editar categoria", row),
    },
    {
      label: "Eliminar",
      icon: <img src={trashIcon} alt="Eliminar" />,
      onClick: (row) => console.log("Eliminar categoria", row),
    },
  ];

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <div className={styles.title}>Categorías</div>

        <div className={styles.headerActions}>
          <div className={styles.totalProducts}>
            Total: {"cantidad"} Categorías
          </div>
          <button className={styles.addButton}>+ Añadir Categoría</button>
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
    </div>
  );
}
export default Categorias;
