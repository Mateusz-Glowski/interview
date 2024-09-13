import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import config from '../config';
import {
  KlinesResponse,
  KlinesResponseProperties,
} from './interfaces/klinesResponse';
import { map, Observable } from 'rxjs';
import { chunk } from 'lodash';

@Injectable()
export class BinanceClientService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Fetch historical market data for a specific cryptocurrency symbol and time range.
   */
  fetchMarketData(symbol: string, startTime: number, endTime: number) {
    // For simplicity purposes for now I'm assuming constant inverval = 1 minute.
    return this.httpService
      .get<KlinesResponse>(
        `${config.binanceApiUrl}/klines?symbol=${symbol}&interval=1m&startTime=${startTime}&endTime=${endTime}`,
      )
      .pipe(map((res) => res.data));
  }

  aggregateMarketData(
    symbol: string,
    startTime: number,
    endTime: number,
    chunkSize: number = 10,
  ): Observable<number[][]> {
    return this.fetchMarketData(symbol, startTime, endTime).pipe(
      map((data) => {
        const closePrice = data.map((x) =>
          Number(x[KlinesResponseProperties.closePrice]),
        );
        return chunk(closePrice, chunkSize);
      }),
    );
  }
}
