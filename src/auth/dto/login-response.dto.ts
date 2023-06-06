import { Type } from "class-transformer";
import { IsMongoId, IsString } from "class-validator";

class LoginUserDto {
  @IsMongoId()
  _id: string;

  @IsString()
  username: string;
}

class LoginRoleDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsString({ each: true })
  permissions: string[];
}

class LoginSellerDto {
  @IsMongoId()
  _id: string;

  @IsString()
  document_number: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @Type(() => LoginUserDto)
  user: LoginUserDto;

  @Type(() => LoginRoleDto)
  role: LoginRoleDto;
}

export class LoginResponseDto {
  @IsString()
  token: string;

  @Type(() => LoginSellerDto)
  user: LoginSellerDto;
}
