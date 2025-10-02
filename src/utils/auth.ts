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
