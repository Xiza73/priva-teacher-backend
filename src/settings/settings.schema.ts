import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
  timestamps: true,
})
export class Setting extends Document {
  @Prop({
    default: 1,
    min: 1,
    max: 4,
    type: Number,
  })
  class_duration_hours: number;

  @Prop({
    default: [1, 2, 3, 4, 5],
    type: [Number],
  })
  available_class_days: number[];

  @Prop({
    default: 20,
    min: 1,
    max: 50,
    type: Number,
  })
  class_capacity: number;

  @Prop({
    default: 10,
    min: 1,
    max: 50,
    type: Number,
  })
  min_class_enrollment: number;

  @Prop({
    default: 7,
    min: 0,
    max: 23,
    type: Number,
  })
  opening_time: number;

  @Prop({
    default: 22,
    min: 0,
    max: 23,
    type: Number,
  })
  closing_time: number;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
