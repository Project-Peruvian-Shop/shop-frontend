export interface UsuarioRequestDto {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    passwordd: string;
    rol: "ADMIN" | "USER" | "MANAGER";
}
//Request for Login
export interface LoginRequestDto {
    email: string;
    passwordd: string;
}