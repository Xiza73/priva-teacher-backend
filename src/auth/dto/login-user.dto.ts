import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(70)
  password: string;
}
