import type { PaginatedProductoResponseDTO } from "../models/Producto/Producto_response_dto";

export interface CartProductoDTO extends PaginatedProductoResponseDTO {
  quantity: number;
}

export const saveProductoToCart = (
  producto: PaginatedProductoResponseDTO,
  quantity: number = 1
) => {
  const cart: CartProductoDTO[] = getCartFromLocalStorage();
  const existingProductIndex = cart.findIndex((p) => p.id === producto.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({ ...producto, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartFromLocalStorage = (): CartProductoDTO[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};
