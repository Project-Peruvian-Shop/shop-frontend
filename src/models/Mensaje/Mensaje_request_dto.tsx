export interface ChangeStateMensajeRequestDTO {
  nuevoEstado: string;
}

export interface MensajeRequestDTO {
  nombre: string;
  tipoDocumento: string;
  documento: string;
  telefono: string;
  email: string;
  contenido: string;
  tipo: string;
  usuario_id: number | null;
}
