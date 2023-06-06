import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { User } from "./user.schema";
import { Model, Types } from "mongoose";
import { Seller } from "src/seller/seller.schema";
import { handleDbException } from "src/common/handlers/error";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Seller.name) private readonly sellerModel: Model<Seller>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp({ username, password, role, seller }: CreateUserDto) {
    try {
      const newUser = await new this.userModel({
        username,
        password,
        role,
      }).save();

      if (!newUser) throw new Error("Error creating user");

      const newSeller = await new this.sellerModel({
        ...seller,
        user: newUser._id,
      }).save();

      if (!newSeller) throw new Error("Error creating seller");

      return {
        created: true,
        message: "User created successfully",
      };
    } catch (error) {
      return handleDbException(error);
    }
  }

  async signIn({ username, password }: LoginUserDto) {
    try {
      const user = await this.userModel.findOne({ username }).exec();

      if (!user) throw new Error("There is no user with that username");

      if (!user.isValidPassword(password))
        throw new Error("The password is incorrect");

      const signedUser = (
        await this.sellerModel.aggregate([
          {
            $match: {
              user: new Types.ObjectId(user._id),
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $lookup: {
              from: "roles",
              localField: "user.role",
              foreignField: "_id",
              as: "role",
            },
          },
          {
            $unwind: "$role",
          },
          {
            $project: {
              _id: 0,
              document_number: 1,
              first_name: 1,
              last_name: 1,
              user: {
                _id: 1,
                username: 1,
              },
              role: {
                _id: 1,
                name: 1,
                permissions: 1,
              },
            },
          },
        ])
      )[0];

      return {
        token: this.jwtService.sign({
          id: user._id,
        }),
        user: signedUser,
      };
    } catch (error) {
      return handleDbException(error);
    }
  }

  async refreshToken(id: string) {
    try {
      return {
        token: this.jwtService.sign({ id: new Types.ObjectId(id) }),
      };
    } catch (error) {
      return handleDbException(error);
    }
  }
}
