export interface MensajeResponseDTO {
  id: number;
}

//Mensaje detalle
export interface MensajeDetalleResponseDTO {
  id: number;
  tipo: string;
  estado: string;
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

export interface MensajeDashboardDTO {
  id: number;
  tipo: string;
  mensaje: string;
  creacion: string;
  estado: string;
}

export interface MensajeCreateResponseDTO {
  id: number;
  contenido: string;
  tipo: string;
  estado: string;
  creacion: Date;
}
