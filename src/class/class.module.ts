import { ClassService } from "./class.service";
import { ClassController } from "./class.controller";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Class, ClassSchema } from "./class.schema";
import { AuthModule } from "src/auth/auth.module";
import { InscriptionModule } from "src/inscription/inscription.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    AuthModule,
    InscriptionModule,
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
