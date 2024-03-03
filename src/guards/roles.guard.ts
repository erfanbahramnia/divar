// nestjs
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
// decorators
import { Roles } from "src/decorators/roles.decorator";

// give access by RBAC(ROLE-BASE ACCESS CONTROL)
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) {};

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        if(ctx.getType() !== "http") 
            throw new ForbiddenException("access denied!");
        // get user data
        const req = ctx.switchToHttp().getRequest();
        const { role } = req.user;
        // get accessable roles
        const roles = this.reflector.get(Roles, ctx.getHandler());
        // check role
        if(!roles.includes(role)) 
            throw new ForbiddenException("access denied!");
        return true;
    };
}