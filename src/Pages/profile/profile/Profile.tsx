import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";
import type { UsuarioProfileDTO } from "../../../models/Usuario/Usuario_response_dto";
import type { CotizacionDashboardDTO } from "../../../models/Cotizacion/Cotizacion_response_dto";
import { obtenerUsuario } from "../../../utils/auth";
import { getProfile } from "../../../services/usuario.service";
import { getCotizacionesByUserPaginated } from "../../../services/cotizacion.service";
import { routes } from "../../../utils/routes";
import Header from "../../../Components/header/Header";
import { Icons } from "../../../Icons/icons";
import MapCard from "../../../Components/dashboard/mapCard/MapCard";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import DashboardTable, {
  type Action,
  type Column,
} from "../../../Components/dashboard/table/DashboardTable";
import IconSVG from "../../../Icons/IconSVG";

function Profile() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [fechaHora, setFechaHora] = useState(new Date());
  const [usuario, setUsuario] = useState<UsuarioProfileDTO | null>(null);
  const [cotizaciones, setCotizaciones] =
    useState<PaginatedResponse<CotizacionDashboardDTO>>();

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Actualizar fecha y hora cada segundo
    const interval = setInterval(() => setFechaHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const localUser = obtenerUsuario(); // trae usuario desde localStorage
    if (!localUser) {
      navigate(routes.login);
      return;
    }

    setLoading(true);

    Promise.all([
      getProfile(localUser.id),
      getCotizacionesByUserPaginated(localUser.id, page, 5), // <--- usa page
    ])
      .then(([userData, cotData]) => {
        setUsuario(userData);
        setCotizaciones(cotData);
        setTotalPages(cotData.totalPages); // <--- asigna total
      })
      .catch(() => {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los datos del perfil o cotizaciones",
        });
      })
      .finally(() => setLoading(false)); // fin loading
  }, [page, navigate]);

  const mapperRol = (rol: string) => {
    switch (rol) {
      case "ROLE_ADMIN":
        return "Propietario";
      case "ROLE_USER":
        return "Usuario";
      case "ROLE_MANAGER":
        return "Administrador";
      default:
        return "Desconocido";
    }
  };

  // columnas
  const columns: Column<CotizacionDashboardDTO>[] = [
    {
      header: "Cotización",
      accessor: "numeroCotizacion",
      render: (_, row) => {
        const fecha = new Date(row.creacion);
        const fechaFormateada = fecha.toLocaleDateString("es-PE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "600" }}>{row.numeroCotizacion}</span>
            <span style={{ fontSize: "0.85em", color: "#666" }}>
              {fechaFormateada}
            </span>
          </div>
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
  ];

  return (
    <div className={styles.container}>
      <Header nombre="Perfil de Usuario" />

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.personal}>
            <div className={styles.title}>Mi Usuario</div>

            <div className={styles.nameContainer}>
              <img
                src={Icons.userIcon}
                alt="logo-img"
                className={styles.logo}
              />
              <div className={styles.textContainer}>
                <span className={styles.name}>
                  {usuario ? usuario.nombre : "Cargando..."}
                </span>
                <span className={styles.tipo}>
                  {usuario ? mapperRol(usuario.rol) : "Cargando..."}
                </span>
              </div>
            </div>

            <div className={styles.datetime}>
              <span className={styles.date}>
                {fechaHora.toLocaleDateString()}
              </span>
              <span className={styles.time}>
                {fechaHora.toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className={styles.personal}>
            <div className={styles.title}>Mis datos personales</div>

            <div>
              <div className={styles.label}>Correo Electrónico</div>
              <div className={styles.email}>
                {usuario ? usuario.email : "Cargando..."}
              </div>
            </div>

            <div>
              <div className={styles.label}>Teléfono</div>
              <div className={styles.phone}>
                {usuario ? usuario.telefono : "Cargando..."}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.title}>Cotizaciones anteriores</div>
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
      </div>
    </div>
  );
}

export default Profile;
