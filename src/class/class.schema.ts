import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { ClassMode } from "./class.interface";
import { EnglishLevel } from "src/common/interfaces/level.interface";

@Schema({
  timestamps: true,
})
export class Class extends Document {
  @Prop({
    required: true,
    type: String,
  })
  mode: ClassMode;

  @Prop({
    trim: true,
    type: String,
  })
  zoom_link: string;

  @Prop({
    trim: true,
    type: String,
  })
  address: string;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: "Client",
  })
  students: Types.ObjectId[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Teacher",
  })
  teacher: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  level: EnglishLevel;

  @Prop({
    default: 1,
    type: Number,
  })
  duration: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Platform",
  })
  platform: Types.ObjectId;

  @Prop({
    default: true,
    type: Boolean,
  })
  is_open: boolean;

  @Prop({
    default: false,
    type: Boolean,
  })
  has_been_given: boolean;

  @Prop({
    default: true,
    type: Boolean,
  })
  is_active: boolean;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
