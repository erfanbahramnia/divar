import { Request } from "express";

export interface UserRequestData extends Request {
    user: {
        username: string,
        userId: number
    }
}