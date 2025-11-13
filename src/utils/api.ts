import axios from "axios";
import {
  obtenerAuthToken,
  obtenerRefreshToken,
  agregarAuthToken,
} from "../utils/auth";
import { obtenerNuevoToken } from "../services/auht.service";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

// 🔹 Interceptor de PETICIONES (antes de enviar)
api.interceptors.request.use((config) => {
  const token = obtenerAuthToken();
  if (token) {
    if (!config.headers) config.headers = {};

    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Interceptor de RESPUESTAS (después de recibir)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el token expiró (403 o 401)
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = obtenerRefreshToken();

        if (!refreshToken) {
          console.warn(
            "No hay refresh token disponible, redirigiendo al login..."
          );
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const newToken = await obtenerNuevoToken(refreshToken);
        agregarAuthToken(newToken.accessToken);

        // Actualizar header y reintentar la petición
        originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
        return api(originalRequest);
      } catch (e) {
        console.error("No se pudo refrescar el token");
        window.location.href = "/login";
        console.log(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
