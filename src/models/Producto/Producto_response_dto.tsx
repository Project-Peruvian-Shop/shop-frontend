export interface PaginatedProductoResponseDTO {
  id: number;
  nombre: string;
  imagenUrl: string;
  imagenAlt: string;
  categoriaNombre: string;
}

export interface ProductoDTO {
  id: number;
  nombre: string;
  descripcion: string;
  imagenId: number;
  productoEnlace: string;
  productoAlt: string;
  categoriaId: number;
  categoriaNombre: string;
  categoriaEnlace: string;
  categoriaAlt: string;
  categoriaUsos: string;
}

export interface ProductoDashboardDTO {
  id: number;
  imagenEnlace: string;
  imagenAlt: string;
  nombre: string;
  categoriaNombre: string;
  descripcion: string;
}

export interface ProductoCreateResponseDTO {
  id: number;
  imagenEnlace: string;
  imagenAlt: string;
  nombre: string;
  categoriaNombre: string;
  descripcion: string;
}
