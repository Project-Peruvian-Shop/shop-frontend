export interface ChangeStateMensajeRequestDTO {
    new_state: number;
}

//Mensaje request

export interface MensajeRequestDTO {
    mensaje_nombre: string;
    mensaje_tipo_documento: number;
    mensaje_documento: string;
    mensaje_telefono: string;
    mensaje_email: string;
    mensaje_contenido: string;
}