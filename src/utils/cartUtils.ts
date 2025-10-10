import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import type { PaginatedProductoResponseDTO } from "../models/Producto/Producto_response_dto";
import { saveProductoToCart } from "./localStorage";

export const addToCart = async (
  producto: PaginatedProductoResponseDTO
): Promise<boolean> => {
  const MySwal = withReactContent(Swal);

  // Pedir cantidad
  const { value } = await Swal.fire({
    title: "Agregar Producto al Carrito",
    input: "number",
    inputLabel: "Ingresa la cantidad",
    inputValue: 1,
    showCancelButton: true,
    inputAttributes: {
      min: "1",
      step: "1",
    },
    inputValidator: (value) => {
      if (!value) return "¡Debes ingresar una cantidad!";
      if (Number(value) < 1) return "La cantidad debe ser mayor que 0";
    },
  });

  if (!value) return false;

  const cantidad = Number(value);

  // Guardar en carrito
  saveProductoToCart(producto, cantidad);

  // Mostrar alerta de éxito y esperar la respuesta
  const result = await MySwal.fire({
    icon: "success",
    title: "¡Producto agregado!",
    text: `Se agregaron ${cantidad} unidad(es) al carrito.`,
    timer: 2000,
    showCancelButton: true,
    confirmButtonText: "Ir al carrito",
    cancelButtonText: "Seguir añadiendo",
  });

  // Retornamos true si el usuario quiere ir al carrito
  if (result.isConfirmed) {
    return true;
  }

  return false;
};
