import type { ApiResponse } from "./global.interfaces";
import type {
  CategoriaCotizadaDTO,
  CotizacionesPorMesDTO,
  KPIResponseDTO,
  ProductoCotizadoDTO,
} from "../models/dashboard/DashboardResponse";
import api from "../utils/api";

const BASE_URL =  "/dashboard";

export async function getKPIS(
  periodo: "DAY" | "WEEK" | "MONTH"
): Promise<KPIResponseDTO> {

  const url = `${BASE_URL}/resumen-kpis?periodo=${periodo}`;

  const res = await api.get<ApiResponse<KPIResponseDTO>>(url);

  return res.data.data;
}

export async function getCotizaciones(): Promise<CotizacionesPorMesDTO[]> {

  const url = `${BASE_URL}/cotizaciones-por-mes`;

  const res = await api.get<ApiResponse<CotizacionesPorMesDTO[]>>(url);

  return res.data.data;
}

export async function getProductos(
  modo: "APARICION" | "DEMANDA",
  mes: number,
  year: number
): Promise<ProductoCotizadoDTO[]> {

  const url = `${BASE_URL}/productos-mas-cotizados?modo=${modo}&mes=${mes}&year=${year}`;

  const res = await api.get<ApiResponse<ProductoCotizadoDTO[]>>(url);

  return res.data.data;
}

export async function getCategorias(
  modo: "APARICION" | "DEMANDA",
  mes: number,
  year: number
): Promise<CategoriaCotizadaDTO[]> {

  const url = `${BASE_URL}/categorias-mas-cotizadas?modo=${modo}&mes=${mes}&year=${year}`;

  const res = await api.get<ApiResponse<CategoriaCotizadaDTO[]>>(url);

  return res.data.data;
}
