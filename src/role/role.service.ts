import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Role } from "./role.schema";
import { Model, Types } from "mongoose";
import { CreateRoleDto } from "./dto/create-role.dto";
import { handleDbException } from "src/common/handlers/error";

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const createdRole = new this.roleModel(createRoleDto);
      return await createdRole.save();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findAll(): Promise<Role[]> {
    try {
      return await this.roleModel.find().exec();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findById(id: string): Promise<Role> {
    try {
      return await this.roleModel.findById(id).exec();
    } catch (error) {
      return handleDbException(error);
    }
  }
}
