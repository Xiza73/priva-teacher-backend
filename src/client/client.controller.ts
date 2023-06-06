import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ClientService } from "./client.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { roleNames } from "src/role/role.interface";
import { CreateClientDto } from "./dto/create-client.dto";
import { Client } from "./client.schema";

@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Auth([roleNames.SUPERVISOR])
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return await this.clientService.create(createClientDto);
  }

  @Get("search")
  @Auth([roleNames.SUPERVISOR])
  async search(): Promise<Client[]> {
    return await this.clientService.searchClients();
  }

  @Get("search/:name")
  @Auth([roleNames.SUPERVISOR])
  async searchClients(@Param("name") name: string): Promise<Client[]> {
    return await this.clientService.searchClients(name);
  }

  @Get(":id")
  @Auth()
  async findById(@Param("id") id: string): Promise<Client> {
    return await this.clientService.findById(id);
  }
}
