import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role/user-role.guard";
import { RoleProtected } from "./role-protected.decorator";
import { RoleName, roleNames } from "src/role/role.interface";

export function Auth(roles: RoleName[] = Object.values(roleNames)) {
  roles.push(roleNames.SUPER_ADMIN);
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
