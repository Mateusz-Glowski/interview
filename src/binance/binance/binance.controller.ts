import { Controller, Get, Query } from '@nestjs/common';
import { BinanceClientService } from '../binance-client.service';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceClientService) {}

  @Get('fetchMarketData')
  fetchMarketData(
    @Query('symbol') symbol: string,
    @Query('startTime') startTime: number, // In millis.
    @Query('endTime') endTime: number,
  ) {
    return this.binanceService.fetchMarketData(symbol, startTime, endTime);
  }

  @Get('aggregateMarketData')
  aggregateMarketData(
    @Query('symbol') symbol: string,
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ) {
    return this.binanceService.aggregateMarketData(symbol, startTime, endTime);
  }
}
