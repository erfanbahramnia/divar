import { Body, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IUser, IUserData, IUserRegisterData } from "src/users/interfaces/user.interface";
import { UsersService } from "src/users/users.service";
import { compareHashPass, generateHashPass, generateSalt } from "src/utils/bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async login(username: string, password: string) {
        // find user
        const user = await this.usersService.findOne(username);
        
        // check user exist
        if(!user) { 
            throw new NotFoundException()
        }
        // check user password is valid
        const enteredPassword = await generateHashPass(password, user.salt);
        const isMatch = compareHashPass(user.password, enteredPassword)
        if(!isMatch) { 
            throw new UnauthorizedException();
        };
        
        // payload for jwt 
        return await this.generateToken(user)
    }

    async register(userData: IUser) {
        // generate random salt for user
        const salt = generateSalt();
        // generateHash pass with salt
        const hash = await generateHashPass(userData.password, salt);
        // complete user data
        const user: IUserRegisterData = {...userData, salt, password: hash};
        // save data in db
        const result = await this.usersService.register(user);
        // check result 
        if(!result) {
            throw new UnauthorizedException();
        };
        return await this.generateToken(result)
    }

    private async generateToken (user: IUserData) {
        const payload = { userId: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload, {secret: this.configService.get<string>("secretKey"), expiresIn: "3600s" })
        }
    }
}