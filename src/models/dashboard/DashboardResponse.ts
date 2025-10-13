export interface DashboardCategoriaDTO {
  categoriaID: number;
  categoriaNombre: string;
  categoriaCantidad: number;
}

export interface DashboardLastCotizacionDTO {
  id: number;
  numero: string;
  totalItems: number;
  estado: string;
}

export interface DashboardMensajeDTO {
  id: number;
  contenido: string;
  tipo: string;
}

export interface DashboardProductoDTO {
  producto_nombre: string;
  producto_cantidad_mes: number;
}

export interface DashboardCotizacionDTO {
  cotizacionesNombreMes: string;
  cotizacionesCantidadMes: number;
}
