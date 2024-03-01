import { Controller, Get, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Role } from "src/constants/role.enum";
import { Roles } from "src/decorators/roles.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { AdminService } from "../service/admin.service";

@UseGuards(AuthGuard, RolesGuard)
@ApiTags("Admin")
@Controller("/admin")
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {}

    @Roles([Role.admin])
    @ApiOperation({summary: "Delete user by admin action"})
    @ApiBearerAuth("JWT-AUTH")
    @ApiUnauthorizedResponse({description: "access denied!"})
    @ApiOkResponse({description: "User deleted successfuly by admin"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    @Get("/deleteUser/:id")
    async deleteUserByAdmin(@Param("id", new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
        // delete user
        const result = await this.adminService.deleteUserById(id);
        // check deletion process
        if(!result)
            throw new InternalServerErrorException("Could not delete user");
        // success
        return {
            type: "successfy",
            status: HttpStatus.OK,
            message: "user deleted successfuly"
        };
    };

    @Roles([Role.admin])
    @ApiOperation({summary: "delete product by admin"})
    @ApiBearerAuth("JWT-AUTH")
    @ApiUnauthorizedResponse({description: "Access denied!"})
    @ApiOkResponse({description: "Product deleted sucessfully"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    @Get("/delete/product/:id")
    async deleteProductByAdmin(@Param("id") productId: number) {
        // delete product
        return this.adminService.deleteProductByAdmin(productId);
    }
}