import styles from "./Mensajes.module.css";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import type { Action, Column } from "../../../Components/table/DashboardTable";
import DashboardTable from "../../../Components/table/DashboardTable";
import { useEffect, useState } from "react";
import { getAllMensajes } from "../../../services/mensajes.service";
import type { MensajeDashboardDTO } from "../../../models/Mensaje/Mensaje_response_dto";
import IconSVG from "../../../Icons/IconSVG";

function Mensajes() {
  const [mensajes, setMensajes] = useState<MensajeDashboardDTO[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadMensajes(page);
  }, [page]);

  const loadMensajes = async (page: number) => {
    try {
      const res: PaginatedResponse<MensajeDashboardDTO> = await getAllMensajes(
        page,
        10
      );
      setMensajes(res.content);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error cargando mensajes:", error);
    }
  };

  // Mapper para tipo de mensaje
  const tipoMensajeMap: Record<string, string> = {
    "0": "Queja",
    "1": "Sugerencia",
    "2": "Contáctenos",
  };

  // Mapper para estado de mensaje
  const estadoMensajeMap: Record<number, string> = {
    0: "Sin atender",
    1: "Contestado",
    2: "Cerrado",
  };

  // Definición de columnas
  const columns: Column<MensajeDashboardDTO>[] = [
    {
      header: "Tipo",
      accessor: "tipo",
      render: (_, row) => <span>{tipoMensajeMap[row.tipo] ?? row.tipo}</span>,
    },
    {
      header: "Mensaje",
      accessor: "mensaje",
      render: (_, row) => {
        return <span>{row.mensaje}</span>;
      },
    },
    {
      header: "Fecha de envío",
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
    {
      header: "Estado",
      accessor: "estado",
      render: (_, row) => (
        <span>{estadoMensajeMap[row.estado] ?? row.estado}</span>
      ),
    },
  ];

  // Acciones con iconos
  const actions: Action<MensajeDashboardDTO>[] = [
    {
      label: "Ver",
      icon: <IconSVG name="view-secondary" size={20} />,
      onClick: (row) => console.log("Ver producto", row),
    },
  ];

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <div className={styles.title}>Usuarios</div>

        <div className={styles.headerActions}>
          <div className={styles.totalProducts}>
            Total: {"cantidad"} Usuarios
          </div>
          <button className={styles.addButton}>+ Añadir Usuario</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <DashboardTable
          columns={columns}
          data={mensajes}
          actions={actions}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default Mensajes;
