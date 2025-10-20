import styles from "./Dashboard.module.css";
// import { useEffect, useState } from "react";
// import {
//   getCotizacionesLineaMes,
//   getLastCotizaciones,
//   getMensajesPendientes,
//   getProductosTopMes,
//   getCotizacionesMes,
// } from "../../../services/dashboard.service";
// import type {
//   DashboardCategoriaDTO,
//   DashboardLastCotizacionDTO,
//   DashboardMensajeDTO,
//   DashboardProductoDTO,
//   DashboardCotizacionDTO,
// } from "../../../models/dashboard/DashboardResponse";

// // 📊 Recharts
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import { PieChart, Pie, Cell, Legend } from "recharts";
// import MapCard from "../../../Components/dashboard/mapCard/MapCard";

// function Dashboard() {
//   const [categorias, setCategorias] = useState<DashboardCategoriaDTO[]>([]);
//   const [lastCotizaciones, setLastCotizaciones] = useState<
//     DashboardLastCotizacionDTO[]
//   >([]);
//   const [mensajes, setMensajes] = useState<DashboardMensajeDTO[]>([]);
//   const [productos, setProductos] = useState<DashboardProductoDTO[]>([]);
//   const [cotizacionesMes, setCotizacionesMes] = useState<
//     DashboardCotizacionDTO[]
//   >([]);

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FB2343"];
//   const getColor = (index: number) => COLORS[index % COLORS.length];

//   useEffect(() => {
//     const fetchCotizaciones = async () => {
//       try {
//         const data = await getCotizacionesMes();
//         setCotizacionesMes(data);
//       } catch (error) {
//         console.error("Error cargando cotizaciones por mes:", error);
//       }
//     };

//     const fetchCategorias = async () => {
//       try {
//         const data = await getCotizacionesLineaMes(
//           new Date().getMonth() + 1,
//           new Date().getFullYear()
//         );
//         setCategorias(data);
//       } catch (error) {
//         console.error("Error cargando categorías:", error);
//       }
//     };

//     const fetchLastCotizaciones = async () => {
//       try {
//         const data = await getLastCotizaciones();
//         setLastCotizaciones(data);
//       } catch (error) {
//         console.error("Error cargando últimas cotizaciones:", error);
//       }
//     };

//     const fetchMensajes = async () => {
//       try {
//         const data = await getMensajesPendientes();
//         setMensajes(data);
//       } catch (error) {
//         console.error("Error cargando mensajes pendientes:", error);
//       }
//     };

//     const fetchProductos = async () => {
//       try {
//         const data = await getProductosTopMes(
//           new Date().getMonth() + 1,
//           new Date().getFullYear()
//         );
//         setProductos(data);
//       } catch (error) {
//         console.error("Error cargando productos:", error);
//       }
//     };

//     fetchCategorias();
//     fetchLastCotizaciones();
//     fetchMensajes();
//     fetchProductos();
//     fetchCotizaciones();
//   }, []);

//   const chartCategorias = categorias.map((c) => ({
//     name: c.categoriaNombre,
//     value: c.categoriaCantidad,
//   }));

//   return (
//     <div className={styles.container}>
//       <div className={styles.left}>
//         {/* Últimas cotizaciones */}
//         <div className={styles.lastCotizaciones}>
//           <div className={styles.title}>Últimas cotizaciones</div>
//           <ul className={styles.list}>
//             {lastCotizaciones.length > 0 ? (
//               lastCotizaciones.map((cot) => (
//                 <li key={cot.id} className={styles.item}>
//                   <div>
//                     <span className={styles.numero}>{cot.numero}</span>{" "}
//                     <span>
//                       <MapCard property="estadoCotizacion" value={cot.estado} />
//                     </span>
//                   </div>
//                   <div className={styles.totalItems}>
//                     Items: {cot.totalItems}
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <li className={styles.item}>No hay datos</li>
//             )}
//           </ul>
//         </div>

//         {/* Mensajes y productos */}
//         <div className={styles.messageProducts}>
//           <div className={styles.messages}>
//             <div className={styles.title}>Mensajes Pendientes</div>
//             <ul className={styles.list}>
//               {mensajes.length > 0 ? (
//                 mensajes.map((msg) => (
//                   <li key={msg.id} className={styles.item}>
//                     <MapCard property="tipoMensaje" value={msg.tipo} />
//                     <div className={styles.mensaje}>{msg.contenido}</div>
//                     <div className={styles.mensaje}>
//                       {new Date(msg.creacion).toLocaleDateString("es-PE", {
//                         year: "numeric",
//                         month: "2-digit",
//                         day: "2-digit",
//                       })}
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li className={styles.item}>No hay mensajes pendientes</li>
//               )}
//             </ul>
//           </div>

//           <div className={styles.productos}>
//             <div className={styles.title}>Productos más cotizados del mes</div>
//             <ul className={styles.list}>
//               {productos.length > 0 ? (
//                 productos.map((prod, idx) => (
//                   <li key={idx} className={styles.item}>
//                     <span className={styles.nombre}>
//                       {prod.producto_nombre}
//                     </span>
//                     <span className={styles.cantidad}>
//                       {prod.producto_cantidad_mes}
//                     </span>
//                   </li>
//                 ))
//               ) : (
//                 <li className={styles.item}>No hay datos</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className={styles.right}>
//         {/* 📊 Gráfico de barras */}
//         <div className={styles.graphic}>
//           <div className={styles.title}>Total de cotizaciones por mes</div>
//           <div className={styles.chart}>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={cotizacionesMes}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="cotizacionesNombreMes" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="cotizacionesCantidadMes" fill="#fb2343" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//         {/* Categorías más cotizadas */}
//         <div className={styles.topCategorias}>
//           <div className={styles.title}>Categorías más cotizadas</div>

//           {/* Gráfico de torta */}
//           {categorias.length > 0 && (
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={chartCategorias}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                 >
//                   {categorias.map((_, index) => (
//                     <Cell key={index} fill={getColor(index)} />
//                   ))}
//                 </Pie>
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           )}

//           {/* Lista */}
//           <ul className={styles.list}>
//             {categorias.length > 0 ? (
//               categorias.map((cat) => (
//                 <li key={cat.categoriaID} className={styles.item}>
//                   <span className={styles.nombre}>{cat.categoriaNombre}</span>
//                   <span className={styles.cantidad}>
//                     {cat.categoriaCantidad}
//                   </span>
//                 </li>
//               ))
//             ) : (
//               <li className={styles.item}>No hay datos</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Dashboard;

import { useEffect, useState } from "react";
import {
  SummaryCard,
  type PeriodSummaryCard,
} from "../../../Components/dashboard/summarycard/SummaryCard";
import { obtenerUsuario } from "../../../utils/auth";
import type {
  CategoriaCotizadaDTO,
  CotizacionesPorMesDTO,
  KPIResponseDTO,
  ProductoCotizadoDTO,
} from "../../../models/dashboard/DashboardResponse";
import {
  getCategorias,
  getCotizaciones,
  getKPIS,
  getProductos,
} from "../../../services/dashboard.service";
import CotizacionesChart from "../../../Components/dashboard/charts/CotizacionChart";
import ProductosMasCotizadosChart from "../../../Components/dashboard/charts/ProductoChart";

function Dashboard() {
  const [period, setPeriod] = useState<PeriodSummaryCard>("MONTH");
  const [modo, setModo] = useState<"APARICION" | "DEMANDA">("DEMANDA");

  const usuario = obtenerUsuario();

  const [kpis, setKpis] = useState<KPIResponseDTO | null>(null);
  const [cotizaciones, setCotizaciones] = useState<
    CotizacionesPorMesDTO[] | null
  >(null);
  const [productos, setProductos] = useState<ProductoCotizadoDTO[]>([]);
  const [categorias, setCategorias] = useState<CategoriaCotizadaDTO[]>([]);

  useEffect(() => {
    const fetchKPIS = async () => {
      try {
        const data = await getKPIS(period);
        setKpis(data);
      } catch (error) {
        console.error("Error cargando kpis", error);
      }
    };

    const fetchCotizaciones = async () => {
      try {
        const data = await getCotizaciones();
        setCotizaciones(data);
      } catch (error) {
        console.error("Error cargando cotizaciones", error);
      }
    };

    const fetchProductos = async () => {
      try {
        const data = await getProductos(
          modo,
          new Date().getMonth() + 1,
          new Date().getFullYear()
        );
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const data = await getCategorias(
          modo,
          new Date().getMonth() + 1,
          new Date().getFullYear()
        );
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorias", error);
      }
    };

    fetchKPIS();
    fetchCotizaciones();
    fetchProductos();
    fetchCategorias();
  }, [period, modo]);

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <div className={styles.title}>Bienvenido, {usuario?.nombre} </div>
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.kpis}>
            <SummaryCard
              title="Cotizaciones Pendientes"
              value={kpis?.cotizacionesPendientes || 0}
              icon="clipboard"
              color="blue"
              period={period}
              onPeriodChange={setPeriod}
            />

            <SummaryCard
              title="Cotizaciones Aceptadas"
              value={kpis?.cotizacionesAceptadas || 0}
              icon="check"
              color="green"
              period={period}
              onPeriodChange={setPeriod}
            />

            <SummaryCard
              title="Mensajes Pendientes"
              value={kpis?.mensajesPendientes || 0}
              icon="message"
              color="orange"
              period={period}
              onPeriodChange={setPeriod}
            />
          </div>

          <div className={styles.chartsContainer}>
            <div className={styles.cotizaciones}>
              <div>Cotizaciones aceptadas:</div>
              <CotizacionesChart data={cotizaciones || []} />
            </div>

            <div className={styles.productos}>
              Productos mas cotizados:
              {productos && productos.length > 0 ? (
                <ProductosMasCotizadosChart data={productos} />
              ) : (
                <p>No hay datos disponibles</p>
              )}{" "}
            </div>
          </div>
        </div>

        <div className={styles.right}></div>
      </div>
    </div>
  );
}

export default Dashboard;
