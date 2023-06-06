import { Auth } from "src/auth/decorators/auth.decorator";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { ResponsePlatformDto } from "./dto/response-platform.dto";
import { Platform } from "./platform.schema";
import { PlatformService } from "./platform.service";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { roleNames } from "src/role/role.interface";

@Controller("platform")
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  @Auth([roleNames.SUPER_ADMIN])
  async create(
    @Body() createPlatformDto: CreatePlatformDto,
  ): Promise<Platform> {
    return await this.platformService.create(createPlatformDto);
  }

  @Get(":id")
  @Auth()
  async findById(@Param("id") id: string): Promise<ResponsePlatformDto> {
    return await this.platformService.findById(id);
  }
}
