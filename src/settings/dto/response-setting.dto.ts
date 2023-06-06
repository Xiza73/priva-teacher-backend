import { IsMongoId, IsNumber } from "class-validator";

export class ResponseSettingDto {
  @IsMongoId()
  _id: string;

  @IsNumber()
  class_duration_hours: number;

  @IsNumber()
  available_class_days: number[];

  @IsNumber()
  class_capacity: number;

  @IsNumber()
  min_class_enrollment: number;

  @IsNumber()
  opening_time: number;

  @IsNumber()
  closing_time: number;
}
