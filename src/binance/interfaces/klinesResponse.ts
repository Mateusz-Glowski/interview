export enum KlinesResponseProperties {
  klineOpenTime,
  openPrice,
  highPrice,
  lowPrice,
  closePrice,
  volume,
  klineCloseTime,
  quoteAssetVolume,
  numberOfTrades,
  takerBuyBaseAssetVolume,
  takerBuyQuoteAssetVolume,
}

export type KlinesEntry = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
];

export type KlinesResponse = KlinesEntry[];
