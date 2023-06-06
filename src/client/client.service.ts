import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Client } from "./client.schema";
import { handleDbException } from "src/common/handlers/error";
import { CreateClientDto } from "./dto/create-client.dto";

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const createdClient = new this.clientModel(createClientDto);
      return await createdClient.save();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async searchClients(name?: string): Promise<Client[]> {
    try {
      if (!name) return await this.clientModel.find().limit(10).exec();

      return await this.clientModel
        .aggregate([
          {
            $match: {
              $or: [
                { first_name: { $regex: name, $options: "i" } },
                { last_name: { $regex: name, $options: "i" } },
              ],
            },
          },
          {
            $limit: 10,
          },
        ])
        .exec();
    } catch (error) {
      return handleDbException(error);
    }
  }

  async findById(id: string): Promise<Client> {
    try {
      const client = await this.clientModel.findById(id).exec();
      return client;
    } catch (error) {
      return handleDbException(error);
    }
  }
}
