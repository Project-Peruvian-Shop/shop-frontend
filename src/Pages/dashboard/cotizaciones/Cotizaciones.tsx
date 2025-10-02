import { useEffect, useState } from "react";
import styles from "./Cotizaciones.module.css";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import type { Action, Column } from "../../../Components/table/DashboardTable";
import DashboardTable from "../../../Components/table/DashboardTable";
import type { CotizacionDashboardDTO } from "../../../models/Cotizacion/Cotizacion_response_dto";
import { getAllCotizaciones } from "../../../services/cotizacion.service";
import IconSVG from "../../../Icons/IconSVG";

function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState<CotizacionDashboardDTO[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadProductos(page);
  }, [page]);

  const loadProductos = async (page: number) => {
    try {
      const res: PaginatedResponse<CotizacionDashboardDTO> =
        await getAllCotizaciones(page, 10);
      setCotizaciones(res.content);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  // Definición de columnas
  const columns: Column<CotizacionDashboardDTO>[] = [
    {
      header: "Número",
      accessor: "numeroCotizacion",
      render: (_, row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
          }}
        >
          <span>{row.numeroCotizacion}</span>
        </div>
      ),
    },
    {
      header: "Cliente",
      accessor: "clienteNombre",
      render: (_, row) => (
        <div>
          <div>{row.clienteNombre}</div>
          <div style={{ fontSize: "0.9rem", color: "#666" }}>
            {row.clienteDocumento}
          </div>
        </div>
      ),
    },
    {
      header: "Creación",
      accessor: "creacion",
      render: (value) => {
        const fecha = new Date(value as string);
        return (
          <span>
            {fecha.toLocaleDateString("es-PE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
        );
      },
    },
    { header: "Estado", accessor: "estado" },
    { header: "Observaciones", accessor: "observaciones" },
  ];

  // Acciones con iconos
  const actions: Action<CotizacionDashboardDTO>[] = [
    {
      label: "Ver",
      icon: <IconSVG name="view-secondary" size={20} />,
      onClick: (row) => console.log("Ver producto", row),
    },
    {
      label: "Editar",
      icon: <IconSVG name="edit-secondary" size={20} />,
      onClick: (row) => console.log("Editar producto", row),
    },
  ];

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <div className={styles.title}>Cotizaciones</div>

        <div className={styles.headerActions}>
          <div className={styles.totalProducts}>
            Total: {"cantidad"} Cotizaciones
          </div>
          <button className={styles.addButton}>+ Añadir Cotización</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <DashboardTable
          columns={columns}
          data={cotizaciones}
          actions={actions}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default Cotizaciones;
