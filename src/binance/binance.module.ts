import { Module } from "@nestjs/common";
import { BinanceClientService } from "./binance-client.service";
import { HttpModule } from "@nestjs/axios";
import { BinanceController } from './binance/binance.controller';

@Module({
  imports: [HttpModule],
  providers: [BinanceClientService],
  controllers: [BinanceController]
})
export class BinanceModule {
}
