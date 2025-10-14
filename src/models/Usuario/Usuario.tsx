export interface Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    passwordd: string;
    telefono: string;
    rol: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_MANAGER"
}