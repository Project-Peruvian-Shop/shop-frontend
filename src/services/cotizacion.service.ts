import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse } from "./global.interfaces";
import type { CotizacionRequestDTO } from "../models/Cotizacion/Cotizacion_request_dto";
import type {
  CotizacionCreateResponseDTO,
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
