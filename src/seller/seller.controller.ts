import { Controller, Get, Param } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { roleNames } from "src/role/role.interface";

@Controller("seller")
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get(":platformId")
  @Auth([roleNames.SUPERVISOR])
  async findByPlatform(@Param("platformId") platformId: string) {
    return await this.sellerService.findByPlatform(platformId);
  }
}
