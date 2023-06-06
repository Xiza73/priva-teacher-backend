import { IsMongoId, IsString, Length } from "class-validator";

export class EnrollStudentDto {
  @IsMongoId()
  classId: string;

  @IsMongoId()
  studentId: string;

  @IsString()
  @Length(5, 100)
  refered_by: string;
}
