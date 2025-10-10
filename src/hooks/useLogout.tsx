import { useNavigate } from "react-router-dom";
import { eliminarUsuario } from "../utils/auth";
import { routes } from "../utils/routes";

export function useLogout() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    eliminarUsuario();
    navigate(routes.login);
  };

  return cerrarSesion;
}
