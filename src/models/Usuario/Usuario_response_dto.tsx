export interface UsuarioResponseDto {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  rol: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_MANAGER";
}

export interface UsuarioProfileDTO {
  id: number;
  nombre: string;
  rol: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_MANAGER";
  email: string;
  telefono: string;
}
