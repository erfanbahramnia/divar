import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dtos/userLogin.dto";
import { AuthGuard } from "./auth.guard";
import { ApiInternalServerErrorResponse, ApiNotAcceptableResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    @ApiOperation({summary: "user login with username and pass"})
    @ApiUnauthorizedResponse({description: "please login again"})
    @ApiOkResponse({description: "wellcom to your website"})
    @ApiInternalServerErrorResponse({description: "Internal server error"})
    login(@Body() userLoginDto: UserLoginDto) {
        return this.authService.login(userLoginDto.username, userLoginDto.password);
    }   

    @Post("/register")
    register() {

    }

    @UseGuards(AuthGuard)
    @Get("/profile")
    getProfile(@Request() req) {
        return req.user;
    }
}