import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse } from "./global.interfaces";
import type {
  DashboardCategoriaDTO,
  DashboardLastCotizacionDTO,
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
