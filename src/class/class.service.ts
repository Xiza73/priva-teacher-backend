import { EnrollStudentDto } from "./dto/enroll-student.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Class } from "./class.schema";
import { Model, Types } from "mongoose";
import { CreateClassDto } from "./dto/create-class.dto";
import { handleDbException } from "src/common/handlers/error";
import { InscriptionService } from "src/inscription/inscription.service";
import { classMode } from "./class.interface";
import { getDateFromString } from "src/common/libs/dayjs";

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name)
    private readonly classModel: Model<Class>,
    private readonly inscriptionService: InscriptionService,
  ) {}

  async create(createClassDto: CreateClassDto) {
    try {
      const { zoom_link, address, mode } = createClassDto;

      if (
        (mode === classMode.VIRTUAL && !zoom_link) ||
        (mode === classMode.PRESENTIAL && !address)
      )
        throw new Error("You must provide a zoom link or an address");

      const createdClass = new this.classModel({
        ...createClassDto,
        students: [],
      });
      await createdClass.save();
      return createdClass;
    } catch (error) {
      return handleDbException(error);
    }
  }

  async isUpdatable(classId: string, studentId: string) {
    const myClass = await this.classModel.findById(classId);

    if (!myClass) throw new Error("Class not found");

    if (myClass.students.includes(new Types.ObjectId(studentId)))
      throw new Error("Student already enrolled");

    if (!myClass.is_open) throw new Error("Class is not open");

    if (!myClass.is_active) throw new Error("Class is not active");

    if (myClass.has_been_given) throw new Error("Class has been given");

    return true;
  }

  async openHandler(classId: string) {
    try {
      const myClass = await this.classModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(classId),
          },
        },
        {
          $lookup: {
            from: "platforms",
            localField: "platform",
            foreignField: "_id",
            as: "platform",
          },
        },
        {
          $unwind: "$platform",
        },
        {
          $lookup: {
            from: "settings",
            localField: "platform.settings",
            foreignField: "_id",
            as: "platform.settings",
          },
        },
        {
          $unwind: "$platform.settings",
        },
        {
          $project: {
            is_open: 1,
            students: 1,
            "platform.settings.class_capacity": 1,
          },
        },
      ]);

      if (!myClass) throw new Error("Class not found");

      if (
        myClass[0].students.length < myClass[0].platform.settings.class_capacity
      )
        return;

      await this.classModel.updateOne(
        {
          _id: new Types.ObjectId(classId),
        },
        {
          $set: {
            is_open: false,
          },
        },
      );
    } catch (error) {
      return handleDbException(error);
    }
  }

  async enrollStudent({ classId, studentId, refered_by }: EnrollStudentDto) {
    try {
      await this.isUpdatable(classId, studentId);

      await this.classModel.updateOne(
        {
          _id: new Types.ObjectId(classId),
        },
        {
          $addToSet: {
            students: new Types.ObjectId(studentId),
          },
        },
      );

      const myClass = await this.classModel.findById(classId);

      await this.inscriptionService.create({
        class: classId,
        student: studentId,
        teacher: myClass.teacher.toString(),
        platform: myClass.platform.toString(),
        refered_by,
      });

      return myClass;
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findById(id: string) {
    try {
      return await this.classModel.findById(id);
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findByWeek(startDate: string, endDate: string, platformId: string) {
    try {
      return await this.classModel.aggregate([
        {
          $match: {
            platform: new Types.ObjectId(platformId),
            created_at: {
              $gte: startDate,
              $lte: endDate,
            },
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
        {
          $lookup: {
            from: "students",
            localField: "students",
            foreignField: "_id",
            as: "students",
          },
        },
        {
          $unwind: {
            path: "$students",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
    } catch (error) {
      return handleDbException(error);
    }
  }
}
