import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { eliminarUsuario } from "../utils/auth";
import { routes } from "../utils/routes";

const MySwal = withReactContent(Swal);

/**
 * Hook que devuelve una función para cerrar sesión
 * con confirmación de SweetAlert2.
 */
export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción cerrará tu sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      eliminarUsuario();

      await MySwal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Tu sesión ha sido cerrada correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(routes.login);
    }
  };

  return logout;
};
