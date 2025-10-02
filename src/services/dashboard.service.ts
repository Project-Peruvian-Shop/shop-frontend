import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse } from "./global.interfaces";
import type {
  DashboardCategoriaDTO,
  DashboardCotizacionDTO,
  DashboardLastCotizacionDTO,
  DashboardMensajeDTO,
  DashboardProductoDTO,
} from "../models/dashboard/DashboardResponse";

const BASE_URL = URL_API + "/cotizacion";

export async function getCotizacionesLineaMes(
  mes: number,
  year: number
): Promise<DashboardCategoriaDTO[]> {
  const url = `${BASE_URL}/lineas_mes?mes=${mes}&year=${year}`;

  const res = await axios.get<ApiResponse<DashboardCategoriaDTO[]>>(url);

  return res.data.data;
}

export async function getLastCotizaciones(): Promise<
  DashboardLastCotizacionDTO[]
> {
  const url = `${BASE_URL}/last-cotizaciones`;

  const res = await axios.get<ApiResponse<DashboardLastCotizacionDTO[]>>(url);

  return res.data.data;
}

export async function getMensajesPendientes(): Promise<DashboardMensajeDTO[]> {
  const url = `${BASE_URL}/mensajes-mes`;

  const res = await axios.get<ApiResponse<DashboardMensajeDTO[]>>(url);

  return res.data.data;
}

export async function getProductosTopMes(
  mes: number,
  year: number
): Promise<DashboardProductoDTO[]> {
  const url = `${BASE_URL}/productos_mes?mes=${mes}&year=${year}`;

  const res = await axios.get<ApiResponse<DashboardProductoDTO[]>>(url);

  return res.data.data;
}

export async function getCotizacionesMes(
  mes: number,
  year: number
): Promise<DashboardCotizacionDTO[]> {
  const url = `${BASE_URL}/cotizaciones_year?mes=${mes}&year=${year}`;

  const res = await axios.get<ApiResponse<DashboardCotizacionDTO[]>>(url);

  return res.data.data;
}
