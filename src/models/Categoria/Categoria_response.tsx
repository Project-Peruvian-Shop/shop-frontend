export interface AllAndQuantityResponseDTO {
  id: number;
  nombre: string;
  cantidad: number;
}

export interface CategoriaDashboardDTO {
  id: number;
  nombre: string;
  usos: string;
  norma: string;
  imagenEnlace: string;
  imagenAlt: string;
}

export interface ProductoResponseDTO {
  id: number;
  nombre: string;
  imagenUrl: string;
  imagenAlt: string;
}
export interface CategoriaCreateResponseDTO {
  id: number;
  nombre: string;
  descripcion: string;
  usos: string;
  norma: string;
  imagenEnlace: string;
  imagenAlt: string;
}