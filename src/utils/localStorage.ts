import type { PaginatedProductoResponseDTO } from "../models/Producto/Producto_response_dto";
import type { ProductoDTO } from "../models/Producto/Producto_response_dto";

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
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};
