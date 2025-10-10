import styles from "./Profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";
import type { UsuarioProfileDTO } from "../../../models/Usuario/Usuario_response_dto";
import type { CotizacionUserDTO } from "../../../models/Cotizacion/Cotizacion_response_dto";
import { eliminarUsuario, obtenerUsuario } from "../../../utils/auth";
import { getProfile } from "../../../services/usuario.service";
import { getCotizacionesByUser } from "../../../services/cotizacion.service";
import { routes } from "../../../utils/routes";
import Header from "../../../Components/header/Header";
import { Icons } from "../../../Icons/icons";

function Profile() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [fechaHora, setFechaHora] = useState(new Date());
  const [usuario, setUsuario] = useState<UsuarioProfileDTO | null>(null);
  const [cotizaciones, setCotizaciones] = useState<CotizacionUserDTO[] | null>(
    null
  );

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

    // Obtener datos completos desde el backend
    getProfile(localUser.id)
      .then((data) => setUsuario(data))
      .catch(() => {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la información del perfil",
        });
      });

    // Obtener cotizaciones del usuario
    getCotizacionesByUser(localUser.id)
      .then((data) => {
        setCotizaciones(data);
        console.log(data);
      })
      .catch(() => {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las cotizaciones",
        });
      });
  }, [navigate]);

  const handleCerrarSesion = () => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción cerrará tu sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarUsuario();

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        navigate(routes.login);
        Toast.fire({
          icon: "success",
          title: "Sesión cerrada exitosamente",
        });
      }
    });
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

  const mapperEstado = (estado: string) => {
    switch (estado) {
      case "PENDIENTE":
        return "Pendiente";
      case "EN_PROCESO":
        return "En proceso";
      case "CERRADA":
        return "Cerrada";
      case "RESPONDIDA":
        return "Respondida";
      default:
        return "Desconocido";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PENDIENTE":
        return styles.sinAtender; // define en CSS color rojo o lo que quieras
      case "EN_PROCESO":
        return styles.enviada; // color azul
      case "RESPONDIDA":
        return styles.cerrada; // color verde
      case "CERRADA":
        return styles.cerrada; // color verde
      default:
        return styles.desconocido; // gris u otro color
    }
  };

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

            {/* Botón de Cerrar Sesión dentro de esta sección */}
            <button
              className={styles.logoutButton}
              onClick={handleCerrarSesion}
            >
              Cerrar Sesión
            </button>
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
          {cotizaciones && cotizaciones.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Número</th>
                  <th>Fecha</th>
                  <th style={{ textAlign: "center" }}>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cotizaciones.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.numero}</td>
                    <td>{new Date(c.creacion).toLocaleDateString()}</td>
                    <td
                      className={`${styles.estado} ${getStatusClass(
                        c.estado.toString()
                      )}`}
                    >
                      {mapperEstado(c.estado)}
                    </td>
                    {/* icono que envia a /cotizacion/:id */}
                    <td>
                      <Link to={`${routes.profile_cotization}${c.id}`}>
                        <img src={Icons.view} alt="Ver" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tienes cotizaciones registradas.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
