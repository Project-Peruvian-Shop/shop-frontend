export interface UsuarioRequestDto {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  passwordd: string;
}

export interface LoginRequestDto {
  email: string;
  passwordd: string;
}

export interface UsuarioSaveRequestDto {
  nombre: string;
  apellidos: string,
  email: string
  telefono: string,
  passwordd: string,
  rol: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_MANAGER"
}
