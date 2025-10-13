import styles from "./Usuarios.module.css";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import type {
  Action,
  Column,
} from "../../../Components/dashboard/table/DashboardTable";
import DashboardTable from "../../../Components/dashboard/table/DashboardTable";
import { useEffect, useState } from "react";
import {
  getAllUsuarios,
  getQuantityUsuarios,
  getSearchUsuarios,
} from "../../../services/usuario.service";
import type { UsuarioDashboardDTO } from "../../../models/Usuario/Usuario_response_dto";
import IconSVG from "../../../Icons/IconSVG";
import SearchBar from "../../../Components/dashboard/searchbar/SearchBar";

function Usuarios() {
  const [usuarios, setUsuarios] =
    useState<PaginatedResponse<UsuarioDashboardDTO>>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [cantidad, setCantidad] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAll(page);
    loadCantidadUsuarios();
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
      const res = await getAllUsuarios(page);
      setUsuarios(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearch = async (text: string, page: number = 0) => {
    setLoading(true);
    try {
      const res = await getSearchUsuarios(text, page);
      setUsuarios(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const loadCantidadUsuarios = async () => {
    try {
      const cantidadUsuarios = await getQuantityUsuarios();
      setCantidad(cantidadUsuarios);
    } catch (error) {
      console.error("Error cargando cantidad de usuarios:", error);
    }
  };

  const roleMap: Record<string, string> = {
    ROLE_ADMIN: "Propietario",
    ROLE_USER: "Usuario",
    ROLE_MANAGER: "Administrador",
  };

  // Definición de columnas
  const columns: Column<UsuarioDashboardDTO>[] = [
    {
      header: "Nombre",
      accessor: "nombre",
      render: (_, row) => (
        <span>
          {row.nombre} {row.apellidos}
        </span>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      render: (_, row) => {
        return <span>{row.email}</span>;
      },
    },
    { header: "Teléfono", accessor: "telefono" },
    {
      header: "Rol",
      accessor: "rol",
      render: (_, row) => <span>{roleMap[row.rol] ?? row.rol}</span>,
    },
  ];

  // Acciones con iconos
  const actions: Action<UsuarioDashboardDTO>[] = [
    {
      label: "Ver",
      icon: <IconSVG name="view-secondary" size={20} />,
      onClick: (row) => console.log("Ver producto", row),
    },
    {
      label: "Eliminar",
      icon: <IconSVG name="delete-primary" size={20} />,
      onClick: (row) => console.log("Eliminar producto", row),
    },
  ];

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <div className={styles.title}>Usuarios</div>

        <div className={styles.searchBarContainer}>
          <SearchBar
            placeholder="Buscar usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.headerActions}>
          <div className={styles.totalProducts}>Total: {cantidad} Usuarios</div>
          <button className={styles.addButton}>+ Añadir Usuario</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <DashboardTable
            columns={columns}
            data={usuarios?.content || []}
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

export default Usuarios;
