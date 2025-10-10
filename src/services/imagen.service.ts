import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ImagenRequestDto } from "../models/Imagen/Imagen_request_dto";
import type { ImagenResponseDTO } from "../models/Imagen/Imagen_response_dto";
import type { ApiResponse } from "./global.interfaces";

const BASE_URL = `${URL_API}/imagen`;

export async function createImagen(
    body: ImagenRequestDto
    ): Promise<ImagenResponseDTO> {

    const url = `${BASE_URL}`;

    const res = await axios.post<ApiResponse<ImagenResponseDTO>>(
        url, 
        body
    );

    return res.data.data;
}