export interface PaginatedProductoResponseDTO {
  id: number;
  nombre: string;
  imagenUrl: string;
  imagenAlt: string;
}

export interface ProductoDTO {
  id: number;
  nombre: string;
  descripcion: string;
  productoEnlace: string;
  productoAlt: string;
  categoriaNombre: string;
  categoriaEnlace: string;
  categoriaAlt: string;
  categoriaUsos: string;
}
