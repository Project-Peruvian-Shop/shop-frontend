import styles from "./Mensajes.module.css";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import type {
  Action,
  Column,
} from "../../../Components/dashboard/table/DashboardTable";
import DashboardTable from "../../../Components/dashboard/table/DashboardTable";
import { useEffect, useState } from "react";
import {
  getAllMensajes,
  getQuantityMensajes,
  getSearchMensajes,
} from "../../../services/mensajes.service";
import type { MensajeDashboardDTO } from "../../../models/Mensaje/Mensaje_response_dto";
import IconSVG from "../../../Icons/IconSVG";
import MapCard from "../../../Components/dashboard/mapCard/MapCard";
import SearchBar from "../../../Components/dashboard/searchbar/SearchBar";

function Mensajes() {
  const [mensajes, setMensajes] =
    useState<PaginatedResponse<MensajeDashboardDTO>>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [cantidad, setCantidad] = useState<MensajeDashboardDTO>();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAll(page);
    loadCantidadMensajes();
  }, [page]);

  useEffect(() => {
    if (search.length === 0) {
      fetchAll(page);
    } else if (search.length >= 3) {
      const delay = setTimeout(() => {
        fetchSearch(search, page);
      }, 400);
      return () => clearTimeout(delay);
    }
  }, [search, page]);

  const fetchAll = async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await getAllMensajes(page);
      setMensajes(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearch = async (text: string, page: number = 0) => {
    setLoading(true);
    try {
      const res = await getSearchMensajes(text, page);
      setMensajes(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const loadCantidadMensajes = async () => {
    try {
      const cantidadMensajes = await getQuantityMensajes(
        new Date().getMonth() + 1
      );
      setCantidad(cantidadMensajes);
    } catch (error) {
      console.error("Error cargando cantidad de mensajes:", error);
    }
  };

  // Definición de columnas
  const columns: Column<MensajeDashboardDTO>[] = [
    {
      header: "Tipo",
      accessor: "tipo",
      render: (value) => (
        <MapCard property="tipoMensaje" value={value as string} />
      ),
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
      render: (value) => (
        <MapCard property="estadoMensaje" value={value as string} />
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
        <div className={styles.title}>Mensajes</div>

        <div className={styles.searchBarContainer}>
          <SearchBar
            placeholder="Buscar mensaje..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.headerActions}>
          <div className={styles.totalCount}>
            Mensajes del mes: {cantidad?.mensaje_response_count_mes}
          </div>
          <div className={styles.totalSecondaryCount}>
            Mensajes por responder: {cantidad?.mensaje_pending_count_mes}
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <DashboardTable
            columns={columns}
            data={mensajes?.content || []}
            actions={actions}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}

export default Mensajes;
