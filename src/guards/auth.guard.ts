import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IUserPayload } from "src/auth/interfaces/IUserPayload.interface";
import { UserRequestData } from "src/interfaces/expresRequest.interface";

@Injectable()
export class AuthGuard implements CanActivate {
    // inject dependencies
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean>{
        // check argument
        if(ctx.getType() !== "http") 
            throw new ForbiddenException("access denied!");
        // get req
        const http = ctx.switchToHttp();
        const request: UserRequestData = http.getRequest();
        // get token
        const { authorization } = request.headers;
        if( !authorization || !authorization.trim()) // check token sended to not
            throw new UnauthorizedException("please login to website");
        const token = authorization.replace(/bearer/gim, "").trim();
        if(!token) // check token exist 
            throw new UnauthorizedException("please login to website");
        // verfiy token
        try {
            const user: IUserPayload = await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>("secretKey")});
            request.user = user;
            return true
        } catch (error) {
        console.log(error);
            throw new ForbiddenException("access denied!")
        }
    }
}