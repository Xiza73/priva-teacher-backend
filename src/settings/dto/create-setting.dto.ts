import { IsNumber, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateSettingDto {
  @IsOptional()
  @IsNumber()
  @MinLength(1)
  @MaxLength(4)
  class_duration_hours?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  @MinLength(1, { each: true })
  @MaxLength(7, { each: true })
  available_class_days?: number[];

  @IsOptional()
  @IsNumber()
  @MinLength(1)
  @MaxLength(50)
  class_capacity?: number;

  @IsOptional()
  @IsNumber()
  @MinLength(1)
  @MaxLength(50)
  min_class_enrollment?: number;

  @IsOptional()
  @IsNumber()
  @MinLength(0)
  @MaxLength(23)
  opening_time?: number;

  @IsOptional()
  @IsNumber()
  @MinLength(0)
  @MaxLength(23)
  closing_time?: number;
}
