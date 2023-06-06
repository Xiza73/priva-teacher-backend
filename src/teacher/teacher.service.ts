import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Teacher } from "./teacher.schema";
import { Model } from "mongoose";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { handleDbException } from "src/common/handlers/error";

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    try {
      const createdTeacher = new this.teacherModel(createTeacherDto);
      return await createdTeacher.save();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async searchTeachers(name?: string): Promise<Teacher[]> {
    try {
      if (!name) return await this.teacherModel.find().limit(10).exec();

      return await this.teacherModel
        .aggregate([
          {
            $match: {
              $or: [
                { first_name: { $regex: name, $options: "i" } },
                { last_name: { $regex: name, $options: "i" } },
              ],
            },
          },
          {
            $limit: 10,
          },
        ])
        .exec();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findById(id: string): Promise<Teacher> {
    try {
      const teacher = await this.teacherModel.findById(id).exec();
      return teacher;
    } catch (error) {
      return handleDbException(error);
    }
  }
}
