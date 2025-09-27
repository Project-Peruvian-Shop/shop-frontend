import type { Usuario } from "../Usuario/Usuario";

export interface Message {
    id: number;
    nombre: string;
    tipo_documento: number;
    documento: string;
    telefono: string;
    email: string;
    contenido: string;
    tipo: number;
    estado: number;
    fecha_creacion: string;
    usuario: Usuario;
}