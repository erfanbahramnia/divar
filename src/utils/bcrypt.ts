import * as bcrypt from "bcrypt"

// generate hash pass with salt
export async function generateHashPass(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
}
// compare user valid password with entered password
export function compareHashPass(userPass: string, enteredPass: string): boolean {
    return userPass === enteredPass ? true : false
}