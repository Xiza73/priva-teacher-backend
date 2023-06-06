import { IsMongoId, IsOptional, IsString, Length } from "class-validator";

export class CreateSellerDto {
  @IsString()
  @Length(8, 8)
  document_number: string;

  @IsString()
  @Length(3, 20)
  first_name: string;

  @IsString()
  @Length(3, 20)
  last_name: string;

  @IsOptional()
  @IsMongoId()
  user?: string;

  @IsMongoId()
  platform: string;
}
