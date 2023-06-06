import { Teacher } from "./../teacher/teacher.schema";
import { Client } from "./../client/client.schema";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Class } from "src/class/class.schema";
import { Platform } from "src/platform/platform.schema";

@Schema({
  timestamps: true,
})
export class Inscription extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Class",
  })
  class: Class;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Client",
  })
  student: Client;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Teacher",
  })
  teacher: Teacher;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Platform",
  })
  platform: Platform;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  refered_by: string;
}

export const InscriptionSchema = SchemaFactory.createForClass(Inscription);
