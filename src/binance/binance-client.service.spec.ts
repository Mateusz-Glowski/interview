import { Test, TestingModule } from '@nestjs/testing';
import { BinanceClientService } from './binance-client.service';
import { HttpModule } from '@nestjs/axios';
import { of } from 'rxjs';
import klinesMock from '../mockedData/klines.mock';
import aggregatedMock from '../mockedData/aggregated.mock';
import priceChangeMock from '../mockedData/priceChange.mock';

describe('BinanceClientService', () => {
  let service: BinanceClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BinanceClientService],
    }).compile();

    service = module.get<BinanceClientService>(BinanceClientService);
  });

  it('should aggregate market data', (done) => {
    jest.spyOn(service, 'fetchMarketData').mockReturnValue(of(klinesMock));
    service
      .aggregateMarketData('BNBBTC', 1726092000000, 1726178400000)
      .subscribe((res) => {
        expect(res).toEqual(aggregatedMock);
        done();
      });
  });

  it('should return price difference information', (done) => {
    jest.spyOn(service, 'fetchMarketData').mockReturnValue(of(klinesMock));
    service
      .priceChange('BNBBTC', 1726092000000, 1726178400000)
      .subscribe((res) => {
        expect(res).toEqual(priceChangeMock);
        done();
      });
  });
});
