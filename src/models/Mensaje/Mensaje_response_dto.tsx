export interface MensajeResponseDTO {
  id: number;
}
export type EstadoMensaje =
  | "PENDIENTE"
  | "EN_PROCESO"
  | "RESUELTO"
  | "CERRADO";
export type MensajeBaseDTO = {
  id: number;
  estado: EstadoMensaje;
};

//Mensaje detalle
export interface MensajeDetalleResponseDTO extends MensajeBaseDTO {
  tipo: string;
  medioRespuesta: string;
  creacion: string;
  contenido: string;
  tipoDocumento: string;
  documento: string;
  nombre: string;
  telefono: string;
  email: string;
}

//Mensaje dashboard

export interface MensajeDashboardDTO {
  mensaje_response_count_mes: number;
  mensaje_pending_count_mes: number;
}

export interface MensajeDashboardDTO extends MensajeBaseDTO{
  tipo: string;
  mensaje: string;
  creacion: string;
}

export interface MensajeCreateResponseDTO {
  id: number;
  contenido: string;
  tipo: string;
  estado: string;
  creacion: Date;
}
