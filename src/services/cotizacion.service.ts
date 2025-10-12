import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse, PaginatedResponse } from "./global.interfaces";
import type {
  CotizacionObservacionDTO,
  CotizacionRequestDTO,
} from "../models/Cotizacion/Cotizacion_request_dto";
import type {
  CotizacionCreateResponseDTO,
  CotizacionDashboardDTO,
  CotizacionFullDTO,
  CotizacionUserDTO,
} from "../models/Cotizacion/Cotizacion_response_dto";

const BASE_URL = URL_API + "/cotizacion";

export async function postCotizacion(
  body: CotizacionRequestDTO
): Promise<CotizacionCreateResponseDTO[]> {
  const url = `${BASE_URL}/create`;

  const res = await axios.post<ApiResponse<CotizacionCreateResponseDTO[]>>(
    url,
    body
  );

  return res.data.data;
}

export async function getCotizacionesByUser(
  id: number
): Promise<CotizacionUserDTO[]> {
  const url = `${BASE_URL}/by-usuario/${id}`;

  const res = await axios.get<ApiResponse<CotizacionUserDTO[]>>(url);

  return res.data.data;
}

export async function getCotizacionById(
  id: number
): Promise<CotizacionFullDTO> {
  const url = `${BASE_URL}/${id}`;

  const res = await axios.get<ApiResponse<CotizacionFullDTO>>(url);

  return res.data.data;
}

export async function getAllCotizaciones(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<CotizacionDashboardDTO>> {
  const url = `${BASE_URL}/dashboard-paginated?page=${page}&size=${size}`;

  const res = await axios.get<
    ApiResponse<PaginatedResponse<CotizacionDashboardDTO>>
  >(url);

  return res.data.data;
}

export async function getQuantityCotizaciones(): Promise<number> {
  const url = `${BASE_URL}/dashboard-quantity`;

  const res = await axios.get<ApiResponse<number>>(url);

  return res.data.data;
}

export async function updateObservacionCotizacion(
  id: number,
  observaciones: string
): Promise<CotizacionObservacionDTO> {
  const url = `${BASE_URL}/observaciones/${id}`;

  const res = await axios.put<ApiResponse<CotizacionObservacionDTO>>(url, {
    observaciones,
  });

  return res.data.data;
}
