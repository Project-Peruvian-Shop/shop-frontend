import styles from "./DashboardPerfil.module.css";
import { useEffect, useState } from "react";
import type {
  TrabajadoresDTO,
  UsuarioProfileDTO,
} from "../../../models/Usuario/Usuario_response_dto";
import { getTrabajadores } from "../../../services/usuario.service";
import userIcon from "../../../Icons/user.svg";
import { obtenerUsuario } from "../../../utils/auth";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import Pagination from "../../../Components/pagination/Pagination";

function DashboardPerfil() {
  const [usuario, setUsuario] = useState<UsuarioProfileDTO | null>(null);
  const [trabajadores, setTrabajadores] = useState<TrabajadoresDTO[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    // Actualizar fecha y hora cada segundo
    const interval = setInterval(() => setFechaHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const localUser = obtenerUsuario(); // trae usuario desde localStorage

    if (localUser && localUser.id) {
      setUsuario(localUser);
    }

    loadTrabajadores(Number(localUser.id), page);
  }, [page]);

  const loadTrabajadores = async (userId: number, page: number) => {
    try {
      const res: PaginatedResponse<TrabajadoresDTO> = await getTrabajadores(
        userId,
        page,
        4
      );

      setTrabajadores(res.content);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.personal}>
            <div className={styles.title}>Mi Usuario</div>

            <div className={styles.nameContainer}>
              <img src={userIcon} alt="logo-img" className={styles.logo} />
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
          <div className={styles.personal}>
            <div className={styles.title}>Usuarios</div>

            <div className={styles.productsList}>
              {trabajadores.map((item, i) => (
                <div key={i} className={styles.productRow}>
                  <div className={styles.productName}>
                    {item.nombreCompleto}
                  </div>
                  <div className={styles.productDetails}>{mapperRol(item.role)}</div>
                </div>
              ))}
            </div>

            <div className={styles.pagination}>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>

          <div className={styles.personal}>Botones</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPerfil;
