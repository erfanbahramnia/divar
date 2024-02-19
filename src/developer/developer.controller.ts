import { Controller, Get } from "@nestjs/common";
import { DeveloperService } from "./developer.service";
import { IUserData } from "src/users/interfaces/user.interface";
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags("Developer-Api")
@Controller("developer")
export class DeveloperController {
    constructor(private developerService: DeveloperService) {}

    @ApiProperty()
    @ApiOperation({summary: "user login with username and pass"})
    @ApiInternalServerErrorResponse({description: "Internal server error"})
    @Get("/users")
    async getUsers(): Promise<IUserData[]> {
        return this.developerService.getUsers();
    }    
}
