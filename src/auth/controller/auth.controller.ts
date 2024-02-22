// configs
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
// services
import { AuthService } from "../service/auth.service";
// dtos
import { UserLoginDto } from "../dtos/userLogin.dto";
import { UserRegisterDto } from "../dtos/userRegister.dto";
// gaurds
import { AuthGuard } from "src/guards/auth.guard";

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

    @HttpCode(HttpStatus.CREATED)
    @Post("/register")
    @ApiOperation({summary: "user register handler"})
    @ApiUnauthorizedResponse({description: "please register again"})
    @ApiOkResponse({description: "wellcom to your website"})
    @ApiInternalServerErrorResponse({description: "Internal server error"})
    register(@Body() userRegisterDto: UserRegisterDto) {
        return this.authService.register(userRegisterDto)
    }

    @UseGuards(AuthGuard)
    @Get("/profile")
    getProfile(@Request() req) {
        return req.user;
    }
}