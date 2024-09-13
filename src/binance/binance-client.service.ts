import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import config from "../config";
import { KlinesResponse } from "./interfaces/klinesResponse";
import { map } from "rxjs";

@Injectable()
export class BinanceClientService {
  constructor(private readonly httpService: HttpService) {
  }

  /**
   * Fetch historical market data for a specific cryptocurrency symbol and time range.
   */
  fetchMarketData(symbol: string) {
    // For simplicity purposes for now I'm assuming constant inverval = 1 minute.
    return this.httpService.get<KlinesResponse>(`${config.binanceApiUrl}/klines?symbol=${symbol}&interval=1m`)
      .pipe(map(res => res.data));
  }
}
