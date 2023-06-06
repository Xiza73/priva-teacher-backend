import {
  IsString,
  Length,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import {
  EnglishLevel,
  englishLevel,
} from "src/common/interfaces/level.interface";

@ValidatorConstraint({ name: "englishLevel", async: false })
export class EnglishLevelValidator implements ValidatorConstraintInterface {
  validate(text: string, _: ValidationArguments) {
    return Object.values(englishLevel).includes(text as EnglishLevel);
  }

  defaultMessage(_: ValidationArguments) {
    return "Text ($value) is not a valid english level name!";
  }
}

export class CreateTeacherDto {
  @IsString()
  @Length(8, 8)
  document_number: string;

  @IsString()
  @Length(3, 20)
  first_name: string;

  @IsString()
  @Length(3, 20)
  last_name: string;

  @Validate(EnglishLevelValidator, {
    each: true,
  })
  levels: EnglishLevel[];
}
