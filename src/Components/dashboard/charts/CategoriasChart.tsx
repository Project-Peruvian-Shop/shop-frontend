import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { CategoriaCotizadaDTO } from "../../../models/dashboard/DashboardResponse";

interface Props {
  data: CategoriaCotizadaDTO[];
}

// 🎨 Paleta de colores para distinguir las categorías
const COLORS = [
  "var(--blue)",
  "var(--green)",
  "var(--secondary-color)",
  "var(--yellow)",
  "var(--primary-color)",
  "var(--red)",
  "var(--orange)",
  "var(--turquoise)",
  "var(--gray)",
];

const CategoriasMasCotizadasChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  // Adaptamos la data para el gráfico
  const chartData = data.map((d) => ({
    name: d.nombreCategoria,
    value: d.cantidadCotizaciones,
  }));

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} cotizaciones`, String(name)]}
          />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoriasMasCotizadasChart;
