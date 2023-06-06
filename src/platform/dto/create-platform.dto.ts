import { IsString, Length } from "class-validator";

export class CreatePlatformDto {
  @IsString()
  @Length(1, 10)
  name: string;
}
