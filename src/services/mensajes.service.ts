import { URL_API } from "../utils/constants";
import type { ApiResponse, PaginatedResponse } from "./global.interfaces";
import type { MensajeRequestDTO } from "../models/Mensaje/Mensaje_request_dto";
import type {
  MensajeCreateResponseDTO,
  MensajeDashboardDTO,
  MensajeDetalleResponseDTO,
} from "../models/Mensaje/Mensaje_response_dto";
import api from "../utils/api";
import axios from "axios";

const BASE_URL = URL_API + "/mensaje";

export async function getAllMensajes(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<MensajeDashboardDTO>> {
  const url = `${BASE_URL}/dashboard-paginated?page=${page}&size=${size}`;

  const res = await api.get<
    ApiResponse<PaginatedResponse<MensajeDashboardDTO>>
  >(url);

  return res.data.data;
}

export async function getSearchMensajes(
  text: string,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<MensajeDashboardDTO>> {
  const url = `${BASE_URL}/dashboard-search?busqueda=${text}&page=${page}&size=${size}`;

  const res = await api.get<
    ApiResponse<PaginatedResponse<MensajeDashboardDTO>>
  >(url);

  return res.data.data;
}

export async function createContactenos(
  body: MensajeRequestDTO
): Promise<MensajeCreateResponseDTO> {
  const url = `${BASE_URL}/contactenos`;

  const res = await axios.post<ApiResponse<MensajeCreateResponseDTO>>(
    url,
    body
  );

  return res.data.data;
}

export async function createLibroReclamaciones(
  body: MensajeRequestDTO
): Promise<MensajeCreateResponseDTO> {
  const url = `${BASE_URL}/reclamaciones`;

  const res = await axios.post<ApiResponse<MensajeCreateResponseDTO>>(
    url,
    body
  );

  return res.data.data;
}

export async function getQuantityMensajes(
  mes: number
): Promise<MensajeDashboardDTO> {
  const url = `${BASE_URL}/dashboard-quantity/${mes}`;

  const res = await api.get<ApiResponse<MensajeDashboardDTO>>(url);

  return res.data.data;
}

export async function changeStateMensaje(
  id: number,
  nuevoEstado: "PENDIENTE" | "EN_PROCESO" | "RESUELTO" | "CERRADO"
): Promise<MensajeDashboardDTO> {
  const url = `${BASE_URL}/change_state/${id}`;

  const res = await api.put<ApiResponse<MensajeDashboardDTO>>(url, { nuevoEstado });

  return res.data.data;
}

export async function getMensajeById(
  id: number
): Promise<MensajeDetalleResponseDTO> {
  const url = `${BASE_URL}/${id}`;

  const res = await api.get<ApiResponse<MensajeDetalleResponseDTO>>(url);

  return res.data.data;
}