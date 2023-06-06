import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "src/auth/user.schema";
import { Platform } from "src/platform/platform.schema";

@Schema({
  timestamps: true,
})
export class Seller extends Document {
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
    type: MongooseSchema.Types.ObjectId,
    ref: "User",
  })
  user: User;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Platform",
  })
  platform: Platform;

  @Prop({
    default: true,
    type: Boolean,
  })
  is_active: boolean;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
