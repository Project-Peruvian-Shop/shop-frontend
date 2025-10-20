import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { CotizacionesPorMesDTO } from "../../../models/dashboard/DashboardResponse";

interface Props {
  data: CotizacionesPorMesDTO[];
}

const CotizacionesChart: React.FC<Props> = ({ data }) => {
  // Traducir número de mes a nombre (opcional)
  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  // Adaptamos la data para el gráfico
  const chartData = data.map((d) => ({
    mes: `${meses[d.mes - 1]} ${d.year.toString().slice(-2)}`,
    cantidad: d.cantidad,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis allowDecimals={false} domain={[0, "dataMax + 1"]} />
          <Tooltip />
          <Bar
            dataKey="cantidad"
            fill="var(--primary-color)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CotizacionesChart;
