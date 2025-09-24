export interface UserResponseDto {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string;
    rol: "ADMIN" | "USER" | "MANAGER";
}