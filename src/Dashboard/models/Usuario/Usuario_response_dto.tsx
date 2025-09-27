export interface UsuarioResponseDto {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    rol: "ADMIN" | "USER" | "MANAGER";
}