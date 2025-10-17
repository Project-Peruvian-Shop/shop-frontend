import type { Cotizacion } from "../Cotizacion/Cotizacion";
import type { CotizacionDetalleId } from "../CotizacionDetalleId/Cotizacion_detalle_id";
import type { Producto } from "../Producto/Producto";

export interface CotizacionDetalle {
  id: CotizacionDetalleId;
  cantidad: number;
  producto: Producto;
  cotizacion: Cotizacion;
}

export interface ProductoCarritoDetalleDTO {
  id: number;
  nombre: string;
  categoriaNombre: string;
  categoriaNorma: string;
  imagenEnlace: string;
  imagenAlt: string;
  cantidad: number;
}
