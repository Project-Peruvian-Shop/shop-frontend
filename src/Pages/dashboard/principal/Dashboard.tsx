import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { getCotizacionesLineaMes } from "../../../services/dashboard.service";
import type { DashboardCategoriaDTO } from "../../../models/dashboard/DashboardResponse";

function Dashboard() {
  const [categorias, setCategorias] = useState<DashboardCategoriaDTO[]>([]);

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

    fetchCategorias();
  }, []);

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
