import { EnrollStudentDto } from "./dto/enroll-student.dto";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ClassService } from "./class.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { roleNames } from "src/role/role.interface";
import { CreateClassDto } from "./dto/create-class.dto";

@Controller("class")
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @Auth([roleNames.SUPERVISOR])
  async create(@Body() createClassDto: CreateClassDto) {
    return await this.classService.create(createClassDto);
  }

  @Post("enroll-student")
  @Auth([roleNames.SUPERVISOR])
  async enrollStudent(@Body() enrollStudentDto: EnrollStudentDto) {
    return await this.classService.enrollStudent(enrollStudentDto);
  }

  @Post("week")
  @Auth()
  async findByWeek(
    @Body()
    {
      startDate,
      endDate,
      platform,
    }: {
      startDate: string;
      endDate: string;
      platform: string;
    },
  ) {
    return await this.classService.findByWeek(startDate, endDate, platform);
  }

  @Get(":id")
  @Auth()
  async findById(@Param("id") id: string) {
    return await this.classService.findById(id);
  }
}
