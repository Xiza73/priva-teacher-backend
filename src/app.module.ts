import { InscriptionModule } from "./inscription/inscription.module";
import { ClassModule } from "./class/class.module";
import { TeacherModule } from "./teacher/teacher.module";
import { PlatformModule } from "./platform/platform.module";
import { SettingsModule } from "./settings/settings.module";
import { RoleModule } from "./role/role.module";
import { SellerModule } from "./seller/seller.module";
import { ClientModule } from "./client/client.module";
import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI || "mongodb://localhost:27017/academy",
    ),
    AuthModule,
    ClassModule,
    ClientModule,
    InscriptionModule,
    PlatformModule,
    RoleModule,
    SellerModule,
    SettingsModule,
    TeacherModule,
  ],
})
export class AppModule {}
