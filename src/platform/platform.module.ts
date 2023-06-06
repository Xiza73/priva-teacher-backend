import { PlatformService } from "./platform.service";
import { PlatformController } from "./platform.controller";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Platform, PlatformSchema } from "./platform.schema";
import { SettingsModule } from "src/settings/settings.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Platform.name, schema: PlatformSchema },
    ]),
    SettingsModule,
    AuthModule,
  ],
  controllers: [PlatformController],
  providers: [PlatformService],
})
export class PlatformModule {}
