export interface DashboardCategoriaDTO {
  categoriaID: number;
  categoriaNombre: string;
  categoriaCantidad: number;
}

export interface DashboardLastCotizacionDTO {
  id: number;
  numero: string;
  totalItems: number;
  estado: number;
}

export interface DashboardMensajeDTO {
  id: number;
  mensaje: string;
  tipo: number;
}
