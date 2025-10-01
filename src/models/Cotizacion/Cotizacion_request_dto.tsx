export interface CotizacionRequestDTO{
    usuarioId: number;
    nombre: string;
    tipoDocumento: number;
    documento: string;
    telefono: string;
    email: string;
    comentario: string;
    observaciones: string;
}