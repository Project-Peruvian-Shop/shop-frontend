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
  name: string;
}

type CustomLabelProps = {
  name?: string;
  percent?: number;
  value?: number;
};

const COLORS = [
  "var(--blue)", // 1️⃣ Azul → da sensación de estabilidad
  "var(--green)", // 2️⃣ Verde → representa éxito o crecimiento
  "var(--yellow)", // 3️⃣ Amarillo → energía, visibilidad
  "var(--orange)", // 4️⃣ Naranja → dinamismo, contraste cálido
  "var(--primary-color)", // 5️⃣ Rojo principal → énfasis / alerta
  "var(--secondary-color)", // 6️⃣ Gris oscuro → balance / sobriedad
  "var(--gray)", // 7️⃣ Gris neutro → relleno o valores bajos
];

const CategoriasMasCotizadasChart: React.FC<Props> = ({ data, name }) => {
  const chartName = name === "DEMANDA" ? "producto(es)" : "aparicion(es)";

  if (!data || data.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  // Adaptamos la data para el gráfico
  const chartData = data.map((d) => ({
    name: d.nombreCategoria,
    value: d.cantidadCotizaciones,
  }));

  return (
    <div style={{ width: "100%", height: "100%", paddingTop: "30px", paddingBottom: "20px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ percent }: CustomLabelProps) =>
              `${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} ${chartName}`]} />
          <Legend
            layout="horizontal"
            align="left"
            verticalAlign="bottom"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoriasMasCotizadasChart;
