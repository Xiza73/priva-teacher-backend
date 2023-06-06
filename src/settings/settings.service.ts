import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Setting } from "./settings.schema";
import { Model } from "mongoose";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { handleDbException } from "src/common/handlers/error";

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name) private readonly settingModel: Model<Setting>,
  ) {}

  async create(createSettingDto?: CreateSettingDto): Promise<Setting> {
    try {
      const createdSetting = new this.settingModel(createSettingDto);
      return await createdSetting.save();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findAll(): Promise<Setting[]> {
    try {
      return await this.settingModel.find().exec();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findById(id: string): Promise<Setting> {
    try {
      return await this.settingModel.findById(id).exec();
    } catch (error) {
      return handleDbException(error);
    }
  }

  // TODO: Implement update and delete
}
