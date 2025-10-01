import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse, PaginatedResponse } from "./global.interfaces";

const BASE_URL = URL_API + "/producto";

export interface ProductoDTO {
  id: number;
  nombre: string;
  imagenUrl: string;
  imagenAlt: string;
}

export async function getPaginatedProductos(
  page: number = 0,
  size: number = 9
): Promise<PaginatedResponse<ProductoDTO>> {
  const url = `${BASE_URL}/paginated?page=${page}&size=${size}`;

  const res = await axios.get<ApiResponse<PaginatedResponse<ProductoDTO>>>(url);

  return res.data.data;
}
