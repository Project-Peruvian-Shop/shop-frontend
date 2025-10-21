import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse, PaginatedResponse } from "./global.interfaces";
import type {
  TrabajadoresDTO,
  UsuarioDashboardDTO,
  UsuarioProfileDTO,
  UsuarioResponseDto,
} from "../models/Usuario/Usuario_response_dto";
import type { UsuarioSaveRequestDto, UsuarioUpdateRequestDto } from "../models/Usuario/Usuario_request_dto";
import { obtenerAuthToken } from "../utils/auth";

const BASE_URL = URL_API + "/usuario";

const accessToken = obtenerAuthToken();


export async function getProfile(id: number): Promise<UsuarioProfileDTO> {
  const url = `${BASE_URL}/${id}`;

  const res = await axios.get<ApiResponse<UsuarioProfileDTO>>(url
    ,{
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    }
  );

  return res.data.data;
}

export async function getAllUsuarios(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<UsuarioDashboardDTO>> {
  const url = `${BASE_URL}/dashboard-paginated?page=${page}&size=${size}`;

  const res = await axios.get<
    ApiResponse<PaginatedResponse<UsuarioDashboardDTO>>
  >(url);

  return res.data.data;
}

export async function getSearchUsuarios(
  text: string,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<UsuarioDashboardDTO>> {
  const url = `${BASE_URL}/dashboard-search?busqueda=${text}&page=${page}&size=${size}`;

  const res = await axios.get<
    ApiResponse<PaginatedResponse<UsuarioDashboardDTO>>
  >(url);

  return res.data.data;
}

export async function getQuantityUsuarios(): Promise<number> {
  const url = `${BASE_URL}/dashboard-quantity`;

  const res = await axios.get<ApiResponse<number>>(url);

  return res.data.data;
}

export async function getTrabajadores(
  id: number,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<TrabajadoresDTO>> {
  const url = `${BASE_URL}/${id}/workers?page=${page}&size=${size}`;

  const res = await axios.get<ApiResponse<PaginatedResponse<TrabajadoresDTO>>>(
    url
  );

  return res.data.data;
}

export async function saveUser(
  body: UsuarioSaveRequestDto
): Promise<UsuarioResponseDto> {
  const url = `${BASE_URL}/save`;

  const res = await axios.post<ApiResponse<UsuarioResponseDto>>(url, body);

  return res.data.data;
  
}
export async function updateUser(
  id: number,
  body: UsuarioUpdateRequestDto
): Promise<UsuarioResponseDto> {
  const url = `${BASE_URL}/update/${id}`;
  
  const res = await axios.put<ApiResponse<UsuarioResponseDto>>(url, body);

  return res.data.data;
}