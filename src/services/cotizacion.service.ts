import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse, PaginatedResponse } from "./global.interfaces";
import type {
  CotizacionChangeStateDTO,
  CotizacionObservacionDTO,
  CotizacionRequestDTO,
} from "../models/Cotizacion/Cotizacion_request_dto";
import type {
  CotizacionCreateResponseDTO,
  CotizacionDashboardDTO,
  CotizacionFullDTO,
  CotizacionPdfDTO,
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

export async function getCotizacionesByUserPaginated(
  id: number,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<CotizacionDashboardDTO>> {
  const url = `${BASE_URL}/by-usuario-paginated/${id}?page=${page}&size=${size}`;

  const res = await axios.get<
    ApiResponse<PaginatedResponse<CotizacionDashboardDTO>>
  >(url);

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

export async function getSearchCotizaciones(
  busqueda: string,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<CotizacionDashboardDTO>> {
  const url = `${BASE_URL}/dashboard-search?busqueda=${encodeURIComponent(
    busqueda
  )}&page=${page}&size=${size}`;

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
export async function change_state(
  id: number,
  nuevoEstado:
    | "PENDIENTE"
    | "EN_PROCESO"
    | "ENVIADA"
    | "ACEPTADA"
    | "RECHAZADA"
    | "CERRADA"
): Promise<CotizacionChangeStateDTO> {
  const url = `${BASE_URL}/change_state/${id}`;

  const res = await axios.put<ApiResponse<CotizacionChangeStateDTO>>(url, {
    nuevoEstado,
  });

  return res.data.data;
}
export async function uploadCotizacionPDF(
  cotizacionId: number,
  file: File
): Promise<CotizacionPdfDTO> {
  const url = `${BASE_URL}/create_pdf/${cotizacionId}`;

  const formData = new FormData();
  formData.append("archivo", file);

  const response = await axios.post<ApiResponse<CotizacionPdfDTO>>(
    url,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
}
