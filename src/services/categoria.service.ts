import axios from "axios";
import { URL_API } from "../utils/constants";
import type { ApiResponse } from "./global.interfaces";
import type { AllAndQuantityResponseDTO } from "../models/Categoria/Categoria_response";

const BASE_URL = URL_API + "/categoria";

export async function getCategoriaAllQuantity(): Promise<
  AllAndQuantityResponseDTO[]
> {
  const url = `${BASE_URL}/all-and-quantity`;

  const res = await axios.get<ApiResponse<AllAndQuantityResponseDTO[]>>(url);

  return res.data.data;
}
