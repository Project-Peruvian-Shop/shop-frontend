import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse } from "./global.interfaces";
import type { CotizacionRequestDTO } from "../models/Cotizacion/Cotizacion_request_dto";
import type { CotizacionCreateResponseDTO } from "../models/Cotizacion/Cotizacion_response_dto";

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
