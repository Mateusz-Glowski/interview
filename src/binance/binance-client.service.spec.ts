import { Test, TestingModule } from '@nestjs/testing';
import { BinanceClientService } from './binance-client.service';

describe('BinanceClientService', () => {
  let service: BinanceClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinanceClientService],
    }).compile();

    service = module.get<BinanceClientService>(BinanceClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
