import { IsMongoId, IsString } from "class-validator";

export class CreateInscriptionDto {
  @IsMongoId()
  class: string;

  @IsMongoId()
  student: string;

  @IsMongoId()
  teacher: string;

  @IsMongoId()
  platform: string;

  @IsString()
  refered_by: string;
}
