import type { UserRole } from "./Usuario";

export interface UsuarioResponseDto {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  rol: UserRole;
  accessToken: string;
  refreshToken: string;
}

export interface UsuarioProfileDTO {
  id: number;
  nombre: string;
  rol: UserRole;
  email: string;
  telefono: string;
}

export interface UsuarioDashboardDTO {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  rol: UserRole;
}

export interface TrabajadoresDTO {
  id: number;
  nombreCompleto: string;
  role: UserRole;
}
