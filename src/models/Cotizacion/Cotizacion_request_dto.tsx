import type { CartProductoDTO } from "../../utils/localStorage";

export interface CotizacionRequestDTO {
  usuarioID: number;
  nombre: string;
  tipoDocumento: string;
  documento: string;
  telefono: string;
  email: string;
  comentario: string;
  productos: CartProductoDTO[];
}
export interface CotizacionObservacionDTO {
  observaciones: string;
}
export interface CotizacionChangeStateDTO {
  nuevoEstado: string;
}
