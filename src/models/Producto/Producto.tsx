import type { Categoria } from "../Categoria/Categoria";
import type { Imagen } from "../Imagen/Imagen";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: Imagen;
  categoria: Categoria;
}
