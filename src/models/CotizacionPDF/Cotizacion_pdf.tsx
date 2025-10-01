import type { Cotizacion } from "../Cotizacion/Cotizacion";

export interface CotizacionPDF{
    id: number;
    archivo: string;
    creacion: string;
    cotizacion: Cotizacion;
}