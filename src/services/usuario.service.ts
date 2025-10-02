import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse } from "./global.interfaces";
import type { UsuarioProfileDTO } from "../models/Usuario/Usuario_response_dto";

const BASE_URL = URL_API + "/usuario";

export async function getProfile(id: number): Promise<UsuarioProfileDTO> {
  const url = `${BASE_URL}/${id}`;

  const res = await axios.get<ApiResponse<UsuarioProfileDTO>>(url);

  return res.data.data;
}
