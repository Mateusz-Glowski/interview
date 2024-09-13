import { Controller, Get, Query } from "@nestjs/common";
import { BinanceClientService } from "../binance-client.service";

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceClientService) {
  }

  @Get('fetchMarketData')
  fetchMarketData(@Query('symbol') symbol: string) {
    return this.binanceService.fetchMarketData(symbol)
  }
}
