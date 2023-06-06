import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { roleNames } from "src/role/role.interface";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { TeacherService } from "./teacher.service";
import { Teacher } from "./teacher.schema";

@Controller("teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @Auth([roleNames.SUPER_ADMIN])
  async create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return await this.teacherService.create(createTeacherDto);
  }

  @Get("search")
  @Auth([roleNames.SUPERVISOR])
  async search(): Promise<Teacher[]> {
    return await this.teacherService.searchTeachers();
  }

  @Get("search/:name")
  @Auth([roleNames.SUPERVISOR])
  async searchTeachers(@Param("name") name: string): Promise<Teacher[]> {
    return await this.teacherService.searchTeachers(name);
  }

  @Get(":id")
  @Auth()
  async findById(@Param("id") id: string): Promise<Teacher> {
    return await this.teacherService.findById(id);
  }
}
