import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest();
        // get jwt token
        const token = this.extractTokenFromHeader(req);
        // check token generated
        if(!token) {
            throw new UnauthorizedException();
        };
        try {
            // get user data
            const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get("secretKey") });
            // assign user data to req
            req["user"] = payload;
        } catch (error) {
            throw new UnauthorizedException();
        };
        // success
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? []
        return type === "Bearer" ? token : undefined;
    }
}