import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import * as bcrypt from "bcrypt";
import { Role } from "src/role/role.schema";

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    required: true,
    trim: true,
    length: 40,
    type: String,
  })
  username: string;

  @Prop({
    required: true,
    trim: true,
    length: 70,
    type: String,
  })
  password: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Role",
  })
  role: Role;

  @Prop({
    default: true,
    type: Boolean,
  })
  is_active: boolean;

  isValidPassword(password: string): boolean {
    const user = this as User;
    return bcrypt.compareSync(password, user.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save", async function (next) {
  const user = this as User;
  if (!user.isModified("password")) return next();
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

UserSchema.methods.isValidPassword = function (password: string): boolean {
  const user = this as User;
  return bcrypt.compareSync(password, user.password);
};
