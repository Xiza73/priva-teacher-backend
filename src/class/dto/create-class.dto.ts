import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { classMode, ClassMode } from "../class.interface";
import { EnglishLevelValidator } from "src/teacher/dto/create-teacher.dto";
import { EnglishLevel } from "src/common/interfaces/level.interface";

@ValidatorConstraint({ name: "classMode", async: false })
export class ClassModeValidator implements ValidatorConstraintInterface {
  validate(text: string, _: ValidationArguments) {
    return Object.values(classMode).includes(text as ClassMode);
  }

  defaultMessage(_: ValidationArguments) {
    return "Text ($value) is not a valid class mode name!";
  }
}

export class CreateClassDto {
  @Validate(ClassModeValidator)
  mode: ClassMode;

  @IsOptional()
  @IsString()
  @Matches(/^(https:\/\/zoom.us\/j\/\d{9,11})$/, {
    message: "The zoom link must be a valid zoom link",
  })
  zoom_link: string;

  @IsOptional()
  @IsString()
  @Length(5, 100)
  address: string;

  @IsMongoId()
  teacher: string;

  @Validate(EnglishLevelValidator)
  level: EnglishLevel;

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsMongoId()
  platform: string;

  @IsOptional()
  @IsBoolean()
  is_open: boolean;

  @IsOptional()
  @IsBoolean()
  has_been_given: boolean;
}
