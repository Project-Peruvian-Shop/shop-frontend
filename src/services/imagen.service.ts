import type { ImagenResponseDTO } from "../models/Imagen/Imagen_response_dto";
import type { ApiResponse } from "./global.interfaces";
import api from "../utils/api";

const BASE_URL = "/imagen";

export async function createImagen(
  formData: FormData
): Promise<ImagenResponseDTO> {
  const url = `${BASE_URL}`;

  const res = await api.post<ApiResponse<ImagenResponseDTO>>(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
}
