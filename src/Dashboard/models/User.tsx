export interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    rol: "ADMIN" | "USER" | "MANAGER";
}