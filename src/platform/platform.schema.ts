import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Setting } from "src/settings/settings.schema";

@Schema({
  timestamps: true,
})
export class Platform extends Document {
  @Prop({
    required: true,
    trim: true,
    length: 10,
    type: String,
  })
  name: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Setting",
  })
  settings: Setting;

  @Prop({
    default: true,
    type: Boolean,
  })
  is_active: boolean;
}

export const PlatformSchema = SchemaFactory.createForClass(Platform);
