import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { ProductoCotizadoDTO } from "../../../models/dashboard/DashboardResponse";

interface Props {
  data: ProductoCotizadoDTO[];
}

const ProductosMasCotizadosChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  const sortedData = [...data].sort(
    (a, b) => b.cantidadApariciones - a.cantidadApariciones
  );

  const topData = sortedData.slice(0, 10);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={topData}
          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            dataKey="nombreProducto"
            type="category"
            width={180} // reduce el espacio reservado para el texto
            tick={{ fontSize: 12, textAnchor: "end" }} // alinea texto hacia la izquierda
          />
          <Tooltip
            formatter={(value) => [`${value}`, "Cantidad de cotizaciones"]}
          />
          <Bar
            dataKey="cantidadApariciones"
            fill="var(--primary-color)"
            radius={[0, 6, 6, 0]}
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductosMasCotizadosChart;
