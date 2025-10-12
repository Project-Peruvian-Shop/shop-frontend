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
  updateObservacionCotizacion,
} from "../../../services/cotizacion.service";
import IconSVG from "../../../Icons/IconSVG";
import { useNavigate } from "react-router-dom";
import ModalObservacion from "../../../Components/dashboard/Modals/Cotizaciones/ModalObservaciones";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState<CotizacionDashboardDTO[]>(
    []
  );
  const [cantidad, setCantidad] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] =
    useState<CotizacionDashboardDTO | null>(null);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    loadCotizaciones(page);
    loadCantidadCotizaciones();
  }, [page]);

  const loadCotizaciones = async (page: number) => {
    try {
      const res: PaginatedResponse<CotizacionDashboardDTO> =
        await getAllCotizaciones(page, 10);
      setCotizaciones(res.content);
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
        cotizaciones.find((c) => c.id === id)?.observaciones || "";

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
        const estado = (value as string)?.toLowerCase();
        // asignar color según estado de la cotización
        let color = "";
        switch (estado) {
          case "pendiente":
            color = "#dc2626"; // rojo
            break;
          case "en_proceso":
            color = "#eab308"; // amarillo
            break;
          case "respondida":
            color = "#16a34a"; // verde
            break;
          case "cerrada":
            color = "#555"; // gris
            break;
          default:
            color = "#777"; // gris oscuro
            break;
        }

        return (
          <span
            style={{
              backgroundColor: color,
              color: "white",
              padding: "4px 10px",
              borderRadius: "9999px",
              fontSize: "0.85rem",
              textTransform: "capitalize",
            }}
          >
            {estado}
          </span>
        );
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
        <div className={styles.headerActions}>
          <div className={styles.totalProducts}>
            Total: {cantidad} Cotizaciones
          </div>
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
