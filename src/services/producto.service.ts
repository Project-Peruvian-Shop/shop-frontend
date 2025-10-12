import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse, PaginatedResponse } from "./global.interfaces";
import type {
  PaginatedProductoResponseDTO,
  ProductoCreateResponseDTO,
  ProductoDashboardDTO,
  ProductoDTO,
} from "../models/Producto/Producto_response_dto";
import type { ProductoRequestDTO } from "../models/Producto/Producto_request_dto";

const BASE_URL = URL_API + "/producto";

export async function getPaginatedProductos(
  page: number = 0,
  size: number = 10,
  categoria: number | null = null
): Promise<PaginatedResponse<PaginatedProductoResponseDTO>> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("size", size.toString());
  if (categoria !== null) {
    params.append("categoria", categoria.toString());
  }

  const url = `${BASE_URL}/paginated?${params.toString()}`;
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
  size: number = 8
): Promise<PaginatedResponse<ProductoDashboardDTO>> {
  const url = `${BASE_URL}/dashboard-paginated?page=${page}&size=${size}`;
  const res = await axios.get<
    ApiResponse<PaginatedResponse<ProductoDashboardDTO>>
  >(url);

  return res.data.data;
}

export async function getSearchProductos(
  busqueda: string,
  page: number = 0,
  size: number = 8
): Promise<PaginatedResponse<ProductoDashboardDTO>> {
  const url = `${BASE_URL}/dashboard-search?busqueda=${encodeURIComponent(
    busqueda
  )}&page=${page}&size=${size}`;

  const res = await axios.get<
    ApiResponse<PaginatedResponse<ProductoDashboardDTO>>
  >(url);

  return res.data.data;
}

export async function createProducto(
  body: ProductoRequestDTO
): Promise<ProductoCreateResponseDTO> {
  const url = `${BASE_URL}/`;
  const res = await axios.post<ApiResponse<ProductoCreateResponseDTO>>(
    url,
    body
  );

  return res.data.data;
}

export async function updateProducto(
  id: number,
  body: ProductoRequestDTO
): Promise<ProductoCreateResponseDTO> {
  const url = `${BASE_URL}/${id}`;
  const res = await axios.put<ApiResponse<ProductoCreateResponseDTO>>(
    url,
    body
  );

  return res.data.data;
}

export async function getQuantityProductos(): Promise<number> {
  const url = `${BASE_URL}/dashboard-quantity`;
  const res = await axios.get<ApiResponse<number>>(url);

  return res.data.data;
}

export async function getSugeridos(
  producto: number,
  categoria: number
): Promise<PaginatedProductoResponseDTO[]> {
  const url = `${BASE_URL}/sugeridos?producto=${producto}&categoria=${categoria}`;
  const res = await axios.get<ApiResponse<PaginatedProductoResponseDTO[]>>(url);

  return res.data.data;
}
