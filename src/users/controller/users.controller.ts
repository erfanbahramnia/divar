import { Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Post, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "../service/users.service";
import { UpdateUserDto } from "../dtos/updateUser.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { UserRequestData } from "src/interfaces/expresRequest.interface";
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ChnagePasswordDto } from "../dtos/changePassword.dto";

@ApiTags("Users")
@UseGuards(AuthGuard)
@Controller("/user")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: "user update it's data"})
    @ApiBearerAuth("JWT-AUTH")
    @ApiUnauthorizedResponse({description: "please login again"})
    @ApiOkResponse({description: "data updated successfuly"})
    @ApiInternalServerErrorResponse({description: "Internal server error"})
    @Post("/update")
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() request: UserRequestData) {
        // get user data
        const { username } = request.user;
        // update user
        const updateResult = await this.usersService.updateUser(username, updateUserDto);
        // if rows not affected keep user the page they are
        if(!updateResult.affected)
            return {
                result: "not any data updated!" 
            };
        // success
        return {
            status: HttpStatus.OK,
            result: "user data updated successfuly"
        };
    }

    @ApiOperation({summary: "user delete it's account"})
    @ApiBearerAuth("JWT-AUTH")
    @ApiUnauthorizedResponse({description: "please login again"})
    @ApiOkResponse({description: "data deleted successfuly"})
    @ApiInternalServerErrorResponse({description: "Internal server error"})
    @Get("/delete")
    async DeleteUser(@Request() req: UserRequestData) {
        // get user id
        const { userId } = req.user;
        // delete user
        const result = await this.usersService.deleteUserById(userId);
        // check user deleted or not
        if(!result.affected) 
            throw new InternalServerErrorException("server couldn't delete user!")
        // success
        return {
            status: HttpStatus.OK,
            message: "User deleted successfuly"
        };
    }


    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: "user change it's password"})
    @ApiBearerAuth("JWT-AUTH")
    @ApiUnauthorizedResponse({description: "please login again"})
    @ApiOkResponse({description: "password updated successfuly"})
    @ApiInternalServerErrorResponse({description: "Internal server error"})
    @Post("/change-pass")
    async ChangeUserPassword(@Body() passwords: ChnagePasswordDto, @Request() req: UserRequestData) {
        // get user id
        const { userId } = req.user;
        // update password
        return this.usersService.changePassword(passwords.oldPassword, passwords.newPassword, userId);
    }
}