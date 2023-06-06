import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";

import { Module } from "@nestjs/common";
import { Client, ClientSchema } from "./client.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    AuthModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
