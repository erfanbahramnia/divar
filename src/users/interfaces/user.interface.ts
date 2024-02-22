export interface IUser {
    username: string,
    first_name: string,
    last_name: string,
    password: string,
    mobile: string,
}

export interface IUserData extends IUser {
    userId: number,
    role: string,
    salt: string
}

export interface IUserRegisterData extends IUser {
    salt: string
}

export interface UpdateUserData {
    username?: string,
    first_name?: string,
    last_name?: string,
    password?: string,
    mobile?: string,
} 