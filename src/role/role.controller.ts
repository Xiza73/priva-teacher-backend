import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { roleNames } from "./role.interface";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Auth([roleNames.SUPER_ADMIN])
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  @Auth([roleNames.SUPER_ADMIN])
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get(":id")
  @Auth([roleNames.SUPER_ADMIN])
  async findById(@Param("id") id: string) {
    return await this.roleService.findById(id);
  }
}
