import { CreateSellerDto } from "./../../seller/dto/create-seller.dto";
import { Type } from "class-transformer";
import {
  IsMongoId,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(4, 40)
  username: string;

  @IsString()
  @Length(8, 70)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "The password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character",
  })
  password: string;

  @IsMongoId()
  role: string;

  @Type(() => CreateSellerDto)
  @ValidateNested()
  seller: CreateSellerDto;
}
