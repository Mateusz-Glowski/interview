export interface AggregatedEntry {
  startTime: Date;
  endTime: Date;
  average: number;
  upOrDown?: 'UP' | 'DOWN';
}

export type AggregatedResponse = AggregatedEntry[];
