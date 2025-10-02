import styles from "./Usuarios.module.css";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import type { Action, Column } from "../../../Components/table/DashboardTable";
import DashboardTable from "../../../Components/table/DashboardTable";
import { useEffect, useState } from "react";
import { getAllUsuarios } from "../../../services/usuario.service";
import type { UsuarioDashboardDTO } from "../../../models/Usuario/Usuario_response_dto";
import IconSVG from "../../../Icons/IconSVG";

function Usuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioDashboardDTO[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadUsuarios(page);
  }, [page]);

  const loadUsuarios = async (page: number) => {
    try {
      const res: PaginatedResponse<UsuarioDashboardDTO> = await getAllUsuarios(
        page,
        10
      );
      setUsuarios(res.content);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error cargando productos:", error);
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
          data={usuarios}
          actions={actions}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default Usuarios;
