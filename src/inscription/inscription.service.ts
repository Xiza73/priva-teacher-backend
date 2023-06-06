import { CreateInscriptionDto } from "./dto/create-inscription.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Inscription } from "./isncription.schema";
import { Model, Types } from "mongoose";
import { handleDbException } from "src/common/handlers/error";

@Injectable()
export class InscriptionService {
  constructor(
    @InjectModel(Inscription.name)
    private readonly inscriptionModel: Model<Inscription>,
  ) {}

  async findAll({
    classId,
    studentId,
    teacherId,
  }: {
    classId?: string;
    studentId?: string;
    teacherId?: string;
    // platformId?: string;
    // date?: string;
  }): Promise<Inscription[]> {
    try {
      let query = {};

      if (classId) query = { ...query, class: new Types.ObjectId(classId) };

      if (studentId)
        query = { ...query, student: new Types.ObjectId(studentId) };

      if (teacherId)
        query = { ...query, teacher: new Types.ObjectId(teacherId) };

      return await this.inscriptionModel.aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: "classes",
            localField: "class",
            foreignField: "_id",
            as: "class",
          },
        },
        {
          $unwind: {
            path: "$class",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "students",
            localField: "student",
            foreignField: "_id",
            as: "student",
          },
        },
        {
          $unwind: {
            path: "$student",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "teachers",
            localField: "teacher",
            foreignField: "_id",
            as: "teacher",
          },
        },
        {
          $unwind: {
            path: "$teacher",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
    } catch (error) {
      return handleDbException(error);
    }
  }

  async create(
    createInscriptionDto: CreateInscriptionDto,
  ): Promise<Inscription> {
    try {
      const inscription = new this.inscriptionModel(createInscriptionDto);
      return await inscription.save();
    } catch (error) {
      return error;
    }
  }
}
