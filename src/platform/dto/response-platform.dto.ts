import { ResponseSettingDto } from "./../../settings/dto/response-setting.dto";
import { Type } from "class-transformer";
import { IsMongoId, IsNumber, IsString } from "class-validator";

export class ResponsePlatformDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @Type(() => ResponseSettingDto)
  settings: ResponseSettingDto;
}
