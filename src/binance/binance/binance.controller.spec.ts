import { Test, TestingModule } from '@nestjs/testing';
import { BinanceController } from './binance.controller';
import { BinanceClientService } from '../binance-client.service';
import { HttpModule } from '@nestjs/axios';

describe('BinanceController', () => {
  let controller: BinanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BinanceClientService],
      controllers: [BinanceController],
    }).compile();

    controller = module.get<BinanceController>(BinanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
