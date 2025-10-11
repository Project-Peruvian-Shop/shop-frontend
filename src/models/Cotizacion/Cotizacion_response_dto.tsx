export interface CotizacionResponseDTO {
  cotizacionId: number;
  tipoDocumento: number;
  documento: string;
  email: string;
  telefono: string;
}

export interface CotizacionCreateResponseDTO {
  ccotizacionID: number;
  numero: string;
  tipoDocumento: number;
  documento: string;
  email: string;
  telefono: string;
}

//Cotizacion dashboard
export interface CotizacionDashboardDTO {
  id: number;
  numeroCotizacion: string;
  clienteNombre: string;
  clienteDocumento: string;
  creacion: string;
  estado: string;
  comentario: string;
  observaciones: string;
}
//CotizacionProductoDTO

export interface CotizacionProductoDTO {
  productoId: number;
  cantidad: number;
}

//CotizacionPdfDTO

export interface CotizacionPdfDTO {
  id: number;
  archivo: string;
  creacion: string;
  cotizacionId: number;
}

//KPI-Categoria

export interface CategoriaMesDTO {
  categoriaId: number;
  categoriaNombre: string;
  categoriaCantidad: number;
}

//KPI-Producto

export interface ProductoCotizadoMesDTO {
  producto_nombre: string;
  producto_cantidad_mes: number;
}

//KPI-Usuario

export interface UsuarioCotizacionMesDTO {
  usuario_nuevo_mes: number;
  usuario_cotizadores_mes: number;
}

//KPI-Cotizaciones

export interface CotizacionYearDTO {
  cotizacionNombreMes: string;
  cotizacionCantidadMes: number;
}

// Cotizacion del usuario
export interface CotizacionUserDTO {
  id: number;
  numero: string;
  creacion: string;
  estado: string;
}

export interface CotizacionFullDTO {
  id: number;
  numero: string;
  estado: string;
  creacion: string;
  comentario: string;
  productos: { name: string; cantidad: number }[];
  tipoDocumento: string;
  documento: string;
  cliente: string;
  email: string;
  telefono: string;
  observaciones: string;
  cotizacionEnlace: string | null;
}
