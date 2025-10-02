import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse, PaginatedResponse } from "./global.interfaces";
import type { MensajeDashboardDTO } from "../models/Mensaje/Mensaje_response_dto";

const BASE_URL = URL_API + "/mensaje";

export async function getAllMensajes(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<MensajeDashboardDTO>> {
  const url = `${BASE_URL}/dashboard-paginated?page=${page}&size=${size}`;

  const res = await axios.get<
    ApiResponse<PaginatedResponse<MensajeDashboardDTO>>
  >(url);

  return res.data.data;
}
