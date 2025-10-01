import type { CotizacionDetalle } from "../CotizacionDetalle/Cotizacion_detalle";
import type { CotizacionPDF } from "../CotizacionPDF/Cotizacion_pdf";
import type { Usuario } from "../Usuario/Usuario";

export interface Cotizacion {
    id: number;
    numero: string;
    estado: number;
    creacion: string;
    comentario: string;

    //datos del cliente
    nombre: string;
    tipoDocumento: number;
    documento: string;
    telefono: string;
    email: string;

    //empresa
    observaciones: string;
    usuario: Usuario;
    detalles: CotizacionDetalle[];
    pdf: CotizacionPDF;

}