import {
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { RoleName, roleNames } from "../role.interface";

@ValidatorConstraint({ name: "roleName", async: false })
export class RoleNameValidator implements ValidatorConstraintInterface {
  validate(text: string, _: ValidationArguments) {
    return Object.values(roleNames).includes(text as RoleName);
  }

  defaultMessage(_: ValidationArguments) {
    return "Text ($value) is not a valid role name!";
  }
}

export class CreateRoleDto {
  @IsString()
  @Length(3, 20)
  @Validate(RoleNameValidator)
  name: RoleName;

  @IsOptional()
  @IsString()
  description: string;
}
