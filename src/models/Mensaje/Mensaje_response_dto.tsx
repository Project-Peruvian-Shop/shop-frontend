export interface MensajeResponseDTO {
    id: number;
}

//Mensaje detalle
export interface MensajeDetalleResponseDTO {
    id: number;
    mensaje_tipo: number;
    mensaje_estado: number;
    mensaje_contenido: string;
    mensaje_tipo_documento: number;
    mensaje_documento: string;
    mensaje_nombre: string;
    mensaje_telefono: string;
    mensaje_email: string;
}

//Mensaje dashboard

export interface MensajeDashboardDTO {
    mensaje_response_count_mes: number;
    mensaje_pending_count_mes: number;
}
