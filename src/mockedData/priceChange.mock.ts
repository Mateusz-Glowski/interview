import { AggregatedResponse } from '../binance/interfaces/aggregatedResponse';

export default [
  {
    startTime: new Date('2024-09-12T22:27:00.000Z'),
    endTime: new Date('2024-09-12T22:36:59.999Z'),
    average: 0.0093125,
  },
  {
    startTime: new Date('2024-09-12T22:37:00.000Z'),
    endTime: new Date('2024-09-12T22:46:59.999Z'),
    average: 0.0093156,
    upOrDown: 'UP',
  },
  {
    startTime: new Date('2024-09-12T22:47:00.000Z'),
    endTime: new Date('2024-09-12T22:56:59.999Z'),
    average: 0.0093236,
    upOrDown: 'UP',
  },
  {
    startTime: new Date('2024-09-12T22:57:00.000Z'),
    endTime: new Date('2024-09-12T23:00:59.999Z'),
    average: 0.0037293,
    upOrDown: 'DOWN',
  },
] as AggregatedResponse;
