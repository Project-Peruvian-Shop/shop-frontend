import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import {
  getCotizacionesLineaMes,
  getLastCotizaciones,
  getMensajesPendientes,
  getProductosTopMes,
} from "../../../services/dashboard.service";
import type {
  DashboardCategoriaDTO,
  DashboardLastCotizacionDTO,
  DashboardMensajeDTO,
  DashboardProductoDTO,
} from "../../../models/dashboard/DashboardResponse";

function Dashboard() {
  const [categorias, setCategorias] = useState<DashboardCategoriaDTO[]>([]);
  const [lastCotizaciones, setLastCotizaciones] = useState<
    DashboardLastCotizacionDTO[]
  >([]);
  const [mensajes, setMensajes] = useState<DashboardMensajeDTO[]>([]);
  const [productos, setProductos] = useState<DashboardProductoDTO[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCotizacionesLineaMes(
          new Date().getMonth() + 1,
          new Date().getFullYear()
        );
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    const fetchLastCotizaciones = async () => {
      try {
        const data = await getLastCotizaciones();
        setLastCotizaciones(data);
      } catch (error) {
        console.error("Error cargando últimas cotizaciones:", error);
      }
    };

    const fetchMensajes = async () => {
      try {
        const data = await getMensajesPendientes();
        setMensajes(data);
      } catch (error) {
        console.error("Error cargando mensajes pendientes:", error);
      }
    };

    const fetchProductos = async () => {
      try {
        const data = await getProductosTopMes(
          new Date().getMonth() + 1,
          new Date().getFullYear()
        );
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchCategorias();
    fetchLastCotizaciones();
    fetchMensajes();
    fetchProductos();
  }, []);

  // Mapeo de estado de cotización
  const estadoMapper: Record<number, string> = {
    0: "Pendiente",
    1: "Aceptada",
    2: "Rechazada",
  };

  // Mapeo de tipo de mensaje
  const tipoMapper: Record<number, string> = {
    0: "Queja",
    1: "Sugerencia",
    2: "Contáctenos",
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.graphic}>
          <div className={styles.title}>Total de cotizaciones por mes</div>
          <div className={styles.chart}></div>
        </div>

        <div className={styles.messageProducts}>
          <div className={styles.messages}>
            <div className={styles.title}>Mensajes Pendientes</div>
            <ul className={styles.list}>
              {mensajes.length > 0 ? (
                mensajes.map((msg) => (
                  <li key={msg.id} className={styles.item}>
                    <div className={styles.tipo}>
                      {tipoMapper[msg.tipo] ?? "Desconocido"}
                    </div>
                    <div className={styles.mensaje}>{msg.mensaje}</div>
                  </li>
                ))
              ) : (
                <li className={styles.item}>No hay mensajes pendientes</li>
              )}
            </ul>
          </div>

          <div className={styles.productos}>
            <div className={styles.title}>Productos más cotizados del mes</div>
            <ul className={styles.list}>
              {productos.length > 0 ? (
                productos.map((prod, idx) => (
                  <li key={idx} className={styles.item}>
                    <span className={styles.nombre}>
                      {prod.producto_nombre}
                    </span>
                    <span className={styles.cantidad}>
                      {prod.producto_cantidad_mes}
                    </span>
                  </li>
                ))
              ) : (
                <li className={styles.item}>No hay datos</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.lastCotizaciones}>
          <div className={styles.title}>Últimas cotizaciones</div>
          <ul className={styles.list}>
            {lastCotizaciones.length > 0 ? (
              lastCotizaciones.map((cot) => (
                <li key={cot.id} className={styles.item}>
                  <div>
                    <span className={styles.numero}>{cot.numero}</span>{" "}
                    <span className={styles.estado}>
                      ({estadoMapper[cot.estado] ?? "Desconocido"})
                    </span>
                  </div>
                  <div className={styles.totalItems}>
                    Items: {cot.totalItems}
                  </div>
                </li>
              ))
            ) : (
              <li className={styles.item}>No hay datos</li>
            )}
          </ul>
        </div>

        <div className={styles.topCategorias}>
          <div className={styles.title}>Categorías más cotizadas</div>
          <ul className={styles.list}>
            {categorias.length > 0 ? (
              categorias.map((cat) => (
                <li key={cat.categoriaID} className={styles.item}>
                  <span className={styles.nombre}>{cat.categoriaNombre}</span>
                  <span className={styles.cantidad}>
                    {cat.categoriaCantidad}
                  </span>
                </li>
              ))
            ) : (
              <li className={styles.item}>No hay datos</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
