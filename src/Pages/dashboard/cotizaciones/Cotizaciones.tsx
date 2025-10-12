import { useEffect, useState } from "react";
import styles from "./Cotizaciones.module.css";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import type {
  Action,
  Column,
} from "../../../Components/dashboard/table/DashboardTable";
import DashboardTable from "../../../Components/dashboard/table/DashboardTable";
import type { CotizacionDashboardDTO } from "../../../models/Cotizacion/Cotizacion_response_dto";
import {
  getAllCotizaciones,
  getQuantityCotizaciones,
  getSearchCotizaciones,
  updateObservacionCotizacion,
} from "../../../services/cotizacion.service";
import IconSVG from "../../../Icons/IconSVG";
import { useNavigate } from "react-router-dom";
import ModalObservacion from "../../../Components/dashboard/Modals/Cotizaciones/ModalObservaciones";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SearchBar from "../../../Components/dashboard/searchbar/SearchBar";
import MapCard from "../../../Components/dashboard/mapCard/MapCard";

function Cotizaciones() {
  const [cotizaciones, setCotizaciones] =
    useState<PaginatedResponse<CotizacionDashboardDTO>>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [cantidad, setCantidad] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] =
    useState<CotizacionDashboardDTO | null>(null);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
    loadCantidadCotizaciones();
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
      const res = await getAllCotizaciones(page);
      setCotizaciones(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearch = async (text: string, page: number = 0) => {
    setLoading(true);
    try {
      const res = await getSearchCotizaciones(text, page);
      setCotizaciones(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const loadCotizaciones = async (page: number) => {
    try {
      const res: PaginatedResponse<CotizacionDashboardDTO> =
        await getAllCotizaciones(page, 10);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error cargando cotizaciones:", error);
    }
  };

  const loadCantidadCotizaciones = async () => {
    try {
      const cantidadCotizaciones = await getQuantityCotizaciones();
      setCantidad(cantidadCotizaciones);
    } catch (error) {
      console.error("Error cargando cantidad de cotizaciones:", error);
    }
  };

  const handleSaveObservacion = async (
    id: number,
    nuevaObservacion: string
  ) => {
    if (!cotizaciones) return;

    try {
      const observacionOriginal =
        cotizaciones.content.find((c) => c.id === id)?.observaciones || "";

      if (nuevaObservacion.trim() === "") {
        await MySwal.fire({
          icon: "warning",
          title: "Observación vacía",
          text: "Por favor, ingresa una observación.",
        });
        return;
      }

      if (nuevaObservacion.trim() === observacionOriginal.trim()) {
        await MySwal.fire({
          icon: "info",
          title: "Sin cambios",
          text: "No se detectaron modificaciones en la observación.",
        });
        return;
      }

      await updateObservacionCotizacion(id, nuevaObservacion);

      await MySwal.fire({
        icon: "success",
        title: "¡Observación actualizada!",
        text: "La observación ha sido modificada correctamente.",
      });

      setShowModal(false);
      await loadCotizaciones(page);
    } catch (error) {
      console.error("Error al actualizar observaciones:", error);
      MySwal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: "No se pudo guardar la observación.",
      });
    }
  };

  // columnas
  const columns: Column<CotizacionDashboardDTO>[] = [
    { header: "Número", accessor: "numeroCotizacion" },
    { header: "Cliente", accessor: "clienteNombre" },
    {
      header: "Estado",
      accessor: "estado",
      render: (value) => {
        return <MapCard propertie="estadoCotizacion" value={value as string} />;
      },
    },
    { header: "Observaciones", accessor: "observaciones" },
  ];

  // acciones de la tabla
  const actions: Action<CotizacionDashboardDTO>[] = [
    {
      label: "Ver",
      icon: <IconSVG name="view-secondary" size={20} />,
      onClick: (row) => navigate(`/dashboard/cotizacion/${row.id}`),
    },
    {
      label: "Editar",
      icon: <IconSVG name="edit-secondary" size={20} />,
      onClick: (row) => {
        setSelectedCotizacion(row);
        setShowModal(true);
      },
    },
  ];

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <div className={styles.title}>Cotizaciones</div>

        <div className={styles.searchBarContainer}>
          <SearchBar
            placeholder="Buscar cotización..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.headerActions}>
          <div className={styles.totalProducts}>
            Total: {cantidad} Cotizaciones
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <DashboardTable
            columns={columns}
            data={cotizaciones ? cotizaciones.content : []}
            actions={actions}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>

      {showModal && (
        <ModalObservacion
          show={showModal}
          cotizacion={selectedCotizacion}
          onClose={() => setShowModal(false)}
          onSubmit={handleSaveObservacion}
        />
      )}
    </div>
  );
}

export default Cotizaciones;
