import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Platform } from "./platform.schema";
import { Model, Schema, Types } from "mongoose";
import { SettingsService } from "src/settings/settings.service";
import { handleDbException } from "src/common/handlers/error";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { ResponsePlatformDto } from "./dto/response-platform.dto";

@Injectable()
export class PlatformService {
  constructor(
    @InjectModel(Platform.name) private readonly platformModel: Model<Platform>,
    private readonly settingsService: SettingsService,
  ) {}

  async create(createPlatformDto: CreatePlatformDto): Promise<Platform> {
    try {
      const settings = await this.settingsService.create();
      const platform = new this.platformModel({
        ...createPlatformDto,
        settings: settings._id,
      });
      return await platform.save();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findAll(): Promise<Platform[]> {
    try {
      return await this.platformModel.find().exec();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findById(id: string): Promise<ResponsePlatformDto> {
    try {
      const platform = await this.platformModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "settings",
            localField: "settings",
            foreignField: "_id",
            as: "settings",
          },
        },
        {
          $unwind: {
            path: "$settings",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

      return platform[0];
    } catch (error) {
      return handleDbException(error);
    }
  }

  // TODO: Update platform
}
