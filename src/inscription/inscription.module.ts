import { InscriptionService } from "./inscription.service";

import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Inscription, InscriptionSchema } from "./isncription.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inscription.name, schema: InscriptionSchema },
    ]),
    AuthModule,
  ],
  controllers: [],
  providers: [InscriptionService],
  exports: [InscriptionService],
})
export class InscriptionModule {}
