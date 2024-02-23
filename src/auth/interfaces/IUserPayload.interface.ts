import { Role } from "src/constants/role.enum";

export interface IUserPayload {
    userId: number;
    username: string;
    role: string
};