import { SellerService } from "./seller.service";
import { SellerController } from "./seller.controller";

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Seller, SellerSchema } from "./seller.schema";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
    AuthModule,
  ],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [SellerService],
})
export class SellerModule {}
