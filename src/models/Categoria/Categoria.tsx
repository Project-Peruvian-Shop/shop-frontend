import type { Imagen } from "../Imagen/Imagen";

export interface Categoria {
    id: number;
    nombre: string;
    usos: string;
    norma: string;
    imagen: Imagen;
}