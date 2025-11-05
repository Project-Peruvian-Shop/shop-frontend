import type { UserRole } from "./Usuario";

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
  apellidos: string;
  email: string;
  telefono: string;
  passwordd: string;
  rol: UserRole;
}

export interface UsuarioUpdateRequestDto {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  rol: UserRole;
}
export interface RefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}
