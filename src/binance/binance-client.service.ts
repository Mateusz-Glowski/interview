import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import config from '../config';
import {
  KlinesResponse,
  KlinesResponseProperties,
} from './interfaces/klinesResponse';
import { map, Observable } from 'rxjs';
import { chunk, sum } from 'lodash';

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

  /**
   * This endpoint calculates average close price in given time interval (10 minutes by default).
   */
  aggregateMarketData(
    symbol: string,
    startTime: number,
    endTime: number,
    chunkSize: number = 10,
  ): Observable<any> {
    return this.groupMarketData(symbol, startTime, endTime, chunkSize).pipe(
      map((grouped) => {
        return grouped.map((group) => ({
          startTime: new Date(group[0][KlinesResponseProperties.klineOpenTime]),
          endTime: new Date(
            group.at(-1)[KlinesResponseProperties.klineCloseTime],
          ),
          average:
            sum(
              group.map((x) => Number(x[KlinesResponseProperties.closePrice])),
            ) / chunkSize,
        }));
      }),
    );
  }

  /**
   * This endpoint builds upon `aggregateMarketData` method and adds additional field `upOrDown`
   * which determines if the price went up/down since the last time period.
   */
  priceChange(
    symbol: string,
    startTime: number,
    endTime: number,
    chunkSize: number = 10,
  ) {
    return this.aggregateMarketData(symbol, startTime, endTime, chunkSize).pipe(
      map((res) => {
        for (let i = 0; i < res.length - 1; i++) {
          const prevAgg = res[i];
          const currAgg = res[i + 1];
          if (i === 0) {
            res[i].upOrDown = '-';
          } else {
            res[i].upOrDown = prevAgg.average > currAgg.average ? 'DOWN' : 'UP';
          }
        }
        return res;
      }),
    );
  }

  private groupMarketData(
    symbol: string,
    startTime: number,
    endTime: number,
    chunkSize: number = 10,
  ): Observable<KlinesResponse> {
    return this.fetchMarketData(symbol, startTime, endTime).pipe(
      map((data) => {
        return chunk(data, chunkSize);
      }),
    );
  }
}
