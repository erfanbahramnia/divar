import { Controller, Get, HttpStatus, InternalServerErrorException, Param } from "@nestjs/common";
import { DeveloperService } from "./developer.service";
import { IUserData } from "src/users/interfaces/user.interface";
import { ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiProperty, ApiTags } from "@nestjs/swagger";
import { Role } from "src/constants/role.enum";

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

    @Get("/:id/:role")
    @ApiProperty()
    @ApiParam({name: "role", enum: Role})
    @ApiOperation({summary: "change user role"})
    @ApiInternalServerErrorResponse({description: "Internal server error"})
    async changeUserRole(@Param("id") id: number ,@Param("role") role: Role) {{
        const result = await this.developerService.changeUserRole(id, role);
        // check changes
        if(! result.affected)
            throw new InternalServerErrorException("can not update user!")
        // successful
        return {
            type: "success",
            status: HttpStatus.OK
        }  
    }}
}
