import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse, PaginatedResponse } from "./global.interfaces";
import type {
  AllAndQuantityResponseDTO,
  CategoriaCreateResponseDTO,
  CategoriaDashboardDTO,
  ProductoResponseDTO,
} from "../models/Categoria/Categoria_response";
import type { CategoriaRequestDTO } from "../models/Categoria/Categoria_request";

const BASE_URL = URL_API + "/categoria";

export async function getCategoriaAllQuantity(): Promise<
  AllAndQuantityResponseDTO[]
> {
  const url = `${BASE_URL}/all-and-quantity`;

  const res = await axios.get<ApiResponse<AllAndQuantityResponseDTO[]>>(url);

  return res.data.data;
}

export async function getAllCategories(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<CategoriaDashboardDTO>> {
  const url = `${BASE_URL}/dashboard-paginated?page=${page}&size=${size}`;

  const res = await axios.get<
    ApiResponse<PaginatedResponse<CategoriaDashboardDTO>>
  >(url);

  return res.data.data;
}

export async function getCategoryById(
  id: number
): Promise<CategoriaDashboardDTO> {
  const url = `${BASE_URL}/${id}`;

  const res = await axios.get<ApiResponse<CategoriaDashboardDTO>>(url);

  return res.data.data;
}

export async function getProductosByCategoryId(
  categoryId: number,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<ProductoResponseDTO>> {
  const url = `${BASE_URL}/productos/${categoryId}?page=${page}&size=${size}`;

  const res = await axios.get<
    ApiResponse<PaginatedResponse<ProductoResponseDTO>>
  >(url);

  return res.data.data;
}

export async function getQuantityCategorias(): Promise<number> {
  const url = `${BASE_URL}/dashboard-quantity`;

  const res = await axios.get<ApiResponse<number>>(url);

  return res.data.data;
}

export async function createCategoria(
  body: CategoriaRequestDTO
): Promise<CategoriaCreateResponseDTO> {
  const url = `${BASE_URL}/`;

  const res = await axios.post<ApiResponse<CategoriaCreateResponseDTO>>(url, body);

  return res.data.data;
}
