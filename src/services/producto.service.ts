import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse, PaginatedResponse } from "./global.interfaces";
import type { PaginatedProductoResponseDTO } from "../models/Producto/Producto_response_dto";

const BASE_URL = URL_API + "/producto";

export async function getPaginatedProductos(
  page: number = 0,
  size: number = 9
): Promise<PaginatedResponse<PaginatedProductoResponseDTO>> {
  const url = `${BASE_URL}/paginated?page=${page}&size=${size}`;

  const res = await axios.get<
    ApiResponse<PaginatedResponse<PaginatedProductoResponseDTO>>
  >(url);

  return res.data.data;
}
