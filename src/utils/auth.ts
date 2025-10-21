import type { UsuarioResponseDto } from "../models/Usuario/Usuario_response_dto";

export const agregarUsuario = (usuario: UsuarioResponseDto) => {
  // Guardar el usuario completo en localStorage
  localStorage.setItem("usuario", JSON.stringify(usuario));
};

export const obtenerUsuario = () => {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
};

export const eliminarUsuario = () => {
  // Eliminar el usuario del localStorage
  localStorage.removeItem("usuario");
};

export const agregarAuthToken = (accessToken: string) => {
  localStorage.setItem("authToken", accessToken);
};

export const obtenerAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const eliminarAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const agregarRefreshToken = (refreshToken: string) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const obtenerRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const eliminarRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};
