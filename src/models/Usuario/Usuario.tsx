export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  passwordd: string;
  telefono: string;
  rol: UserRole;
}

// añadir roles
export type UserRole =
  | "ROLE_SUPERADMIN"
  | "ROLE_ADMINISTRADOR"
  | "ROLE_SUPERVISOR"
  | "ROLE_CLIENTE";

export const UserRoleConst = {
  SUPERADMIN: "ROLE_SUPERADMIN" as UserRole,
  ADMINISTRADOR: "ROLE_ADMINISTRADOR" as UserRole,
  SUPERVISOR: "ROLE_SUPERVISOR" as UserRole,
  CLIENTE: "ROLE_CLIENTE" as UserRole,
};
