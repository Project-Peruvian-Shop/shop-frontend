import { useEffect, useState } from "react";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import type { ProductoDashboardDTO } from "../../../models/Producto/Producto_response_dto";
import { getAllProductos } from "../../../services/producto.service";
import viewIcon from "../../../Icons/view-db.svg";
import editIcon from "../../../Icons/edit-db.svg";
import trashIcon from "../../../Icons/trash-db.svg";
import DashboardTable, {
  type Action,
  type Column,
} from "../../../Components/table/DashboardTable";
import styles from "./Productos.module.css";
import { useNavigate } from "react-router-dom";

export default function ProductosTable() {
  const [productos, setProductos] = useState<ProductoDashboardDTO[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadProductos(page);
  }, [page]);

  const loadProductos = async (page: number) => {
    try {
      const res: PaginatedResponse<ProductoDashboardDTO> =
        await getAllProductos(page, 10);
      setProductos(res.content);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  // Definición de columnas
  const columns: Column<ProductoDashboardDTO>[] = [
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
    { header: "Categoría", accessor: "categoriaNombre" },
    { header: "Descripción", accessor: "descripcion" },
  ];

  // Acciones con iconos
  const actions: Action<ProductoDashboardDTO>[] = [
    {
      label: "Ver",
      icon: <img src={viewIcon} alt="Ver" />,
      onClick: (row) => {
        navigate(`/dashboard/product/${row.id}`);
        console.log("Ver producto", row);
      },
    },
    {
      label: "Editar",
      icon: <img src={editIcon} alt="Editar" />,
      onClick: (row) => console.log("Editar producto", row),
    },
    {
      label: "Eliminar",
      icon: <img src={trashIcon} alt="Eliminar" />,
      onClick: (row) => console.log("Eliminar producto", row),
    },
  ];

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <div className={styles.title}>Productos</div>

        <div className={styles.headerActions}>
          <div className={styles.totalProducts}>
            Total: {"cantidad"} Productos
          </div>
          <button className={styles.addButton}>+ Añadir Producto</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <DashboardTable
          columns={columns}
          data={productos}
          actions={actions}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
