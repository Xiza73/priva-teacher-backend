import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { EconomicLevel } from "./client.interface";

@Schema({
  timestamps: true,
})
export class Client extends Document {
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
    type: String,
  })
  address: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  economic_level: EconomicLevel;

  @Prop({
    required: true,
    trim: true,
    type: Number,
  })
  age: number;

  @Prop({
    required: false,
    trim: true,
    type: String,
  })
  phone_number: string;

  @Prop({
    default: true,
    type: Boolean,
  })
  is_active: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
