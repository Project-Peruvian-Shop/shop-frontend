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
