import Swal from "sweetalert2";
import type { PaginatedProductoResponseDTO } from "../models/Producto/Producto_response_dto";
import type { ProductoDTO } from "../models/Producto/Producto_response_dto";
import type { ProductoCarritoDetalleDTO } from "../models/CotizacionDetalle/Cotizacion_detalle";
import { getProductoCarritoDetalle } from "../services/cotizacion.service";

export interface CartProductoDTO extends PaginatedProductoResponseDTO {
  cantidad: number;
}

export const setCartToLocalStorage = (items: CartProductoDTO[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const getCartFromLocalStorage = (): CartProductoDTO[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveProductoToCart = (
  producto: ProductoDTO | PaginatedProductoResponseDTO,
  cantidad: number = 1
) => {
  const productoParaCart: PaginatedProductoResponseDTO =
    "imagenUrl" in producto
      ? producto
      : {
          id: producto.id,
          nombre: producto.nombre,
          imagenUrl: producto.productoEnlace,
          imagenAlt: producto.productoAlt,
          categoriaNombre: producto.categoriaNombre,
        };

  const cart: CartProductoDTO[] = getCartFromLocalStorage();
  const existingProductIndex = cart.findIndex(
    (p) => p.id === productoParaCart.id
  );

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].cantidad += cantidad;
  } else {
    cart.push({ ...productoParaCart, cantidad });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));
};

export const agregarProductosCotizacionAlCarrito = async (
  numeroCotizacion: string,
  cotizacionId: number
) => {
  const result = await Swal.fire({
    title: "¿Agregar productos al carrito?",
    text: `¿Deseas cargar los productos de la cotización ${numeroCotizacion} al carrito?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, agregar",
    cancelButtonText: "No, cancelar",
    confirmButtonColor: "#1b2f33",
    cancelButtonColor: "#fb2343",
  });

  if (!result.isConfirmed) return;

  try {
    Swal.fire({
      title: "Cargando productos...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const productos: ProductoCarritoDetalleDTO[] =
      await getProductoCarritoDetalle(cotizacionId);

    for (const producto of productos) {
      saveProductoToCart(
        {
          id: producto.id,
          nombre: producto.nombre,
          imagenUrl: producto.imagenEnlace,
          imagenAlt: producto.imagenAlt,
          categoriaNombre:
            producto.categoriaNombre + " " + producto.categoriaNorma,
        } as PaginatedProductoResponseDTO,
        producto.cantidad
      );
    }

    Swal.fire({
      icon: "success",
      title: "Productos agregados",
      text: "Los productos fueron cargados correctamente al carrito.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar los productos. Inténtalo nuevamente.",
    });
  }
};

export const actualizarCantidadEnCart = (
  cart: CartProductoDTO[],
  setCart: (cart: CartProductoDTO[]) => void,
  id: number,
  delta: number
) => {
  const updatedCart = cart
    .map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + delta } : item
    )
    .filter((item) => item.cantidad > 0);
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const eliminarProductoDelCart = (
  cart: CartProductoDTO[],
  setCart: (cart: CartProductoDTO[]) => void,
  id: number
) => {
  const updatedCart = cart.filter((item) => item.id !== id);
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};
