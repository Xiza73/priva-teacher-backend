import { TeacherService } from "./teacher.service";
import { TeacherController } from "./teacher.controller";
import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Teacher, TeacherSchema } from "./teacher.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    AuthModule,
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
