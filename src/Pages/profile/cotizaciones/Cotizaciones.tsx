import { useEffect, useState } from "react";
import Header from "../../../Components/header/Header";
import styles from "./Cotizaciones.module.css";
import DashboardTable, {
  type Action,
  type Column,
} from "../../../Components/dashboard/table/DashboardTable";
import type { CotizacionDashboardDTO } from "../../../models/Cotizacion/Cotizacion_response_dto";
import MapCard from "../../../Components/dashboard/mapCard/MapCard";
import IconSVG from "../../../Icons/IconSVG";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import { useNavigate } from "react-router";
import { getCotizacionesByUserPaginated } from "../../../services/cotizacion.service";
import { obtenerUsuario } from "../../../utils/auth";
import { routes } from "../../../utils/routes";

function CotizacionesProfile() {
  const [cotizaciones, setCotizaciones] =
    useState<PaginatedResponse<CotizacionDashboardDTO>>();
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async (page: number = 0) => {
      const localUser = obtenerUsuario(); // trae usuario desde localStorage
      if (!localUser) {
        navigate(routes.login);
        return;
      }

      setLoading(true);
      try {
        const res = await getCotizacionesByUserPaginated(localUser.id, page);
        setCotizaciones(res);
        setTotalPages(res.totalPages);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [page, navigate]);

  // columnas
  const columns: Column<CotizacionDashboardDTO>[] = [
    { header: "Número", accessor: "numeroCotizacion" },
    { header: "Cliente", accessor: "clienteNombre" },
    {
      header: "Fecha",
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
        <MapCard property="estadoCotizacion" value={value as string} />
      ),
    },
  ];

  // acciones de la tabla
  const actions: Action<CotizacionDashboardDTO>[] = [
    {
      label: "Ver",
      icon: <IconSVG name="view-secondary" size={20} />,
      onClick: (row) => navigate(`/perfil/cotizaciones/${row.id}`),
    },
    {
      label: "Editar",
      icon: <IconSVG name="repeat" size={20} />,
      onClick: (row) => {
        console.log(row);
      },
    },
  ];

  return (
    <div className={styles.container}>
      <Header nombre="Mis cotizaciones" />

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
    </div>
  );
}

export default CotizacionesProfile;
