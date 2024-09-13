# Interview Task - Mateusz Głowski

## How to run

```bash
npm i
npm run start:dev
```

## About endpoints

This app exposes 3 endpoints:

### /binance/fetchMarketData

Returns basic information about given symbol pair.
Data format is the same as received from binance API, so it might be not the
easiest to read, here's description of every field:

- klineOpenTime,
- openPrice,
- highPrice,
- lowPrice,
- closePrice,
- volume,
- klineCloseTime,
- quoteAssetVolume,
- numberOfTrades,
- takerBuyBaseAssetVolume,
- takerBuyQuoteAssetVolume

example request:

```bash
curl --location --request GET 'localhost:3000/binance/fetchMarketData?symbol=BNBBTC&startTime=1726234711076&endTime=1726234811076'
```

### /binance/aggregateMarketData

Returns average price of given symbol for specified interval (in minutes).
For example:

```bash
curl --location --request GET 'localhost:3000/binance/aggregateMarketData?symbol=BNBBTC&startTime=1726180000000&endTime=1726182000000&interval=10'
```

will return:

```json
[
  {
    "startTime": "2024-09-12T22:27:00.000Z",
    "endTime": "2024-09-12T22:36:59.999Z",
    "average": 0.0093125
  },
  {
    "startTime": "2024-09-12T22:37:00.000Z",
    "endTime": "2024-09-12T22:46:59.999Z",
    "average": 0.0093156
  },
  {
    "startTime": "2024-09-12T22:47:00.000Z",
    "endTime": "2024-09-12T22:56:59.999Z",
    "average": 0.0093236
  },
  {
    "startTime": "2024-09-12T22:57:00.000Z",
    "endTime": "2024-09-12T23:00:59.999Z",
    "average": 0.0037293
  }
]
```

### /binance/priceChange

This endpoint builds upon the previous one, so it works identically, except
it adds one more field to the response which defines if the price wend up or down
since the previous interval.

```bash
curl --location --request GET 'localhost:3000/binance/priceChange?symbol=BNBBTC&startTime=1726180000000&endTime=1726182000000&interval=10'```
```

Which will result in:

```json
[
  {
    "startTime": "2024-09-12T22:27:00.000Z",
    "endTime": "2024-09-12T22:36:59.999Z",
    "average": 0.0093125
  },
  {
    "startTime": "2024-09-12T22:37:00.000Z",
    "endTime": "2024-09-12T22:46:59.999Z",
    "average": 0.0093156,
    "upOrDown": "UP"
  },
  {
    "startTime": "2024-09-12T22:47:00.000Z",
    "endTime": "2024-09-12T22:56:59.999Z",
    "average": 0.0093236,
    "upOrDown": "UP"
  },
  {
    "startTime": "2024-09-12T22:57:00.000Z",
    "endTime": "2024-09-12T23:00:59.999Z",
    "average": 0.0037293,
    "upOrDown": "DOWN"
  }
]
```

## What is missing
- There is no persistence layer. Every time you send a request - it's being
sent to Binance (except tests - they use mocks).
- There's no error handling. You get default error message defined by NestJs framework. 