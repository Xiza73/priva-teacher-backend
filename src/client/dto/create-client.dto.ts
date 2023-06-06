import { EconomicLevel, economicLevel } from "./../client.interface";
import {
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "economicLevel", async: false })
export class EconomicLevelValidator implements ValidatorConstraintInterface {
  validate(text: string, _: ValidationArguments) {
    return Object.values(economicLevel).includes(text as EconomicLevel);
  }

  defaultMessage(_: ValidationArguments) {
    return "Text ($value) is not a valid economic level name!";
  }
}

export class CreateClientDto {
  @IsString()
  @Length(8, 8)
  document_number: string;

  @IsString()
  @Length(3, 20)
  first_name: string;

  @IsString()
  @Length(3, 20)
  last_name: string;

  @IsString()
  address: string;

  @IsString()
  @Validate(EconomicLevelValidator)
  economic_level: EconomicLevel;

  @IsNumber()
  @Min(8)
  @Max(100)
  age: number;

  @IsString()
  @Length(9, 13)
  phone_number: string;
}
