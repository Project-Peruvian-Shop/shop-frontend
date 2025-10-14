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
  saveUser,
  updateUser,
} from "../../../services/usuario.service";
import type { UsuarioDashboardDTO } from "../../../models/Usuario/Usuario_response_dto";
import IconSVG from "../../../Icons/IconSVG";
import SearchBar from "../../../Components/dashboard/searchbar/SearchBar";
import type { UsuarioSaveRequestDto, UsuarioUpdateRequestDto } from "../../../models/Usuario/Usuario_request_dto";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalUsuarioCreate from "../../../Components/dashboard/Modals/Usuario/ModalUsuarioCreate";
import ModalUsuarioEdit from "../../../Components/dashboard/Modals/Usuario/ModalUsuarioEdit";

function Usuarios() {
  const [usuarios, setUsuarios] =
    useState<PaginatedResponse<UsuarioDashboardDTO>>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [cantidad, setCantidad] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UsuarioDashboardDTO | null>(null);
  const MySwal = withReactContent(Swal);

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

  const handleAddUser = async (data: UsuarioSaveRequestDto) => {
    try {
      const newUser = await saveUser(data);
      fetchAll(page);
      loadCantidadUsuarios();
      setShowModal(false);
      if (newUser) {
        MySwal.fire({
          icon: "success",
          title: "Usuario añadido",
          text: `El usuario ${newUser.nombre} ha sido añadido correctamente.`,
        });
      }
    } catch (error: unknown) {
      let errorMessage = "Error al añadir usuario";

      type AxiosErrorLike = {
        isAxiosError?: boolean;
        response?: {
          data?: {
            message?: string;
          };
        };
      };
      const axiosError = error as AxiosErrorLike;

      if (axiosError.isAxiosError) {
        errorMessage = axiosError.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      MySwal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });

      console.error("Error al añadir usuario:", error);
    }
  };
  const handleEditUser = async (data: UsuarioUpdateRequestDto) => {
    
    if (!selectedUser) return;
    try {
      const updatedUser = await updateUser(selectedUser.id, data);
      fetchAll(page);
      loadCantidadUsuarios();
      setShowEditModal(false);
      if (updatedUser) {
        MySwal.fire({
          icon: "success",
          title: "Usuario editado",
          text: `El usuario ha sido editado correctamente.`,
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Error al editar usuario" + (error instanceof Error ? error.message : ''),
      })
      
    }
  }

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
      label: "Editar",
      icon: <IconSVG name="edit-secondary" size={20} />,
      onClick: (row) => {
        setSelectedUser(row);
        setShowEditModal(true);
        console.log(selectedUser);
        
      }
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
          <button
            className={styles.addButton}
            onClick={() => setShowModal(true)}
          >
            + Añadir Usuario
          </button>
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
      {showModal && (
        <ModalUsuarioCreate
          onClose={() => setShowModal(false)}
          onSubmit={handleAddUser}
        />
      )}
      {showEditModal && selectedUser && (
        <ModalUsuarioEdit
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditUser}
          user={selectedUser}
        />
      )}
    </div>
  );
}
export default Usuarios;
