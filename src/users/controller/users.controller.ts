import { Body, Controller, NotFoundException, Post, Redirect, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "../service/users.service";
import { UpdateUserDto } from "../dtos/updateUser.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { UserRequestData } from "src/interfaces/expresRequest.interface";
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("/user")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
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
            result: "user data updated successfuly"
        };
    }
}