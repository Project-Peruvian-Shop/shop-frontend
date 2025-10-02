import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse, PaginatedResponse } from "./global.interfaces";
import type {
  PaginatedProductoResponseDTO,
  ProductoDashboardDTO,
  ProductoDTO,
} from "../models/Producto/Producto_response_dto";

const BASE_URL = URL_API + "/producto";

export async function getPaginatedProductos(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<PaginatedProductoResponseDTO>> {
  const url = `${BASE_URL}/paginated?page=${page}&size=${size}`;

  const res = await axios.get<
    ApiResponse<PaginatedResponse<PaginatedProductoResponseDTO>>
  >(url);

  return res.data.data;
}

export async function getProductoById(id: number): Promise<ProductoDTO> {
  const url = `${BASE_URL}/${id}`;

  const res = await axios.get<ApiResponse<ProductoDTO>>(url);

  return res.data.data;
}

export async function getAllProductos(
  page: number = 0,
  size: number = 10
): Promise<ProductoDashboardDTO[]> {
  const url = `${BASE_URL}/dashboard-paginated?page=${page}&size=${size}`;

  const res = await axios.get<ApiResponse<ProductoDashboardDTO[]>>(url);

  return res.data.data;
}
