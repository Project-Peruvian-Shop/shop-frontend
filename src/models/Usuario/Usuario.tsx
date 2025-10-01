export interface Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    passwordd: string;
    telefono: string;
    rol: "ADMIN" | "USER" | "MANAGER";
}