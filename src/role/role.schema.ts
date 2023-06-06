import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Permission, RoleName, rolePermissions } from "./role.interface";

@Schema({
  timestamps: true,
})
export class Role extends Document {
  @Prop({
    length: 20,
    required: true,
    trim: true,
    type: String,
    unique: true,
  })
  name: RoleName;

  @Prop({
    trim: true,
    type: String,
  })
  description: string;

  @Prop({
    required: false,
    type: [String],
  })
  permissions: Permission[];

  @Prop({
    default: true,
    type: Boolean,
  })
  is_active: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

// add permissions previously created
RoleSchema.pre("save", function (next) {
  const role = this as Role;
  role.permissions = rolePermissions[role.name];
  next();
});
