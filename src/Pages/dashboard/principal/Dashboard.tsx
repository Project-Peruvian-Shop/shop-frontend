import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import {
  getCotizacionesLineaMes,
  getLastCotizaciones,
  getMensajesPendientes,
  getProductosTopMes,
  getCotizacionesMes,
} from "../../../services/dashboard.service";
import type {
  DashboardCategoriaDTO,
  DashboardLastCotizacionDTO,
  DashboardMensajeDTO,
  DashboardProductoDTO,
  DashboardCotizacionDTO,
} from "../../../models/dashboard/DashboardResponse";

// 📊 Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";

function Dashboard() {
  const [categorias, setCategorias] = useState<DashboardCategoriaDTO[]>([]);
  const [lastCotizaciones, setLastCotizaciones] = useState<
    DashboardLastCotizacionDTO[]
  >([]);
  const [mensajes, setMensajes] = useState<DashboardMensajeDTO[]>([]);
  const [productos, setProductos] = useState<DashboardProductoDTO[]>([]);
  const [cotizacionesMes, setCotizacionesMes] = useState<
    DashboardCotizacionDTO[]
  >([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FB2343"];
  const getColor = (index: number) => COLORS[index % COLORS.length];

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const data = await getCotizacionesMes();
        setCotizacionesMes(data);
      } catch (error) {
        console.error("Error cargando cotizaciones por mes:", error);
      }
    };

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
    fetchCotizaciones();
  }, []);

  // mapeos
  const estadoMapper: Record<number, string> = {
    0: "Pendiente",
    1: "Aceptada",
    2: "Rechazada",
  };

  const tipoMapper: Record<number, string> = {
    0: "Queja",
    1: "Sugerencia",
    2: "Contáctenos",
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* 📊 Gráfico de barras */}
        <div className={styles.graphic}>
          <div className={styles.title}>Total de cotizaciones por mes</div>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={cotizacionesMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cotizacionesNombreMes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cotizacionesCantidadMes" fill="#fb2343" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mensajes y productos */}
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
        {/* Últimas cotizaciones */}
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

        {/* Categorías más cotizadas */}
        <div className={styles.topCategorias}>
          <div className={styles.title}>Categorías más cotizadas</div>

          {/* Gráfico de torta */}
          {categorias.length > 0 && (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categorias}
                  dataKey="categoriaCantidad"
                  nameKey="categoriaNombre"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {categorias.map((_, index) => (
                    <Cell key={index} fill={getColor(index)} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}

          {/* Lista */}
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
