import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { EnglishLevel } from "src/common/interfaces/level.interface";

@Schema({
  timestamps: true,
})
export class Teacher extends Document {
  @Prop({
    length: 8,
    required: true,
    trim: true,
    type: String,
    unique: true,
  })
  document_number: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  first_name: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  last_name: string;

  @Prop({
    required: true,
    trim: true,
    type: [String],
  })
  levels: EnglishLevel[];

  @Prop({
    default: true,
    type: Boolean,
  })
  is_active: boolean;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
