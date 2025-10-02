import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import {
  getCotizacionesLineaMes,
  getLastCotizaciones,
} from "../../../services/dashboard.service";
import type {
  DashboardCategoriaDTO,
  DashboardLastCotizacionDTO,
} from "../../../models/dashboard/DashboardResponse";

function Dashboard() {
  const [categorias, setCategorias] = useState<DashboardCategoriaDTO[]>([]);
  const [lastCotizaciones, setLastCotizaciones] = useState<
    DashboardLastCotizacionDTO[]
  >([]);

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

    fetchCategorias();
    fetchLastCotizaciones();
  }, []);

  // Mapeo de estado
  const estadoMapper: Record<number, string> = {
    0: "Pendiente",
    1: "Aceptada",
    2: "Rechazada",
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
          </div>

          <div className={styles.productos}>
            <div className={styles.title}>Productos más cotizados del mes</div>
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
