export const agregarUsuario = () => {
  const nuevoUsuario = { id: 1, name: "Wilmer Guevara" };

  // Guardar un único usuario en localStorage
  localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
};

export const obtenerUsuario = () => {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
}

export const eliminarUsuario = () => {
  // Eliminar el usuario del localStorage
  localStorage.removeItem("usuario");
}