import { ValidRoles } from "src/auth/interfaces/valid-roles.enum";
import { RoleProtected } from "./role-protected.decorator";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "src/auth/guards/user-role/user-role.guard";

export function Auth(...roles: ValidRoles[]) {

    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard)
    )
}