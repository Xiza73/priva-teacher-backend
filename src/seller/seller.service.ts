import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Seller } from "./seller.schema";
import { Model, Types } from "mongoose";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { handleDbException } from "src/common/handlers/error";

@Injectable()
export class SellerService {
  constructor(
    @InjectModel(Seller.name) private readonly sellerModel: Model<Seller>,
  ) {}

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    try {
      const createdSeller = new this.sellerModel(createSellerDto);
      return await createdSeller.save();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findByPlatform(platformId: string): Promise<Seller[]> {
    try {
      return await this.sellerModel
        .find({ platform: new Types.ObjectId(platformId) })
        .exec();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findById(id: string): Promise<Seller> {
    try {
      return await this.sellerModel.findById(id).exec();
    } catch (error) {
      return handleDbException(error);
    }
  }
}
