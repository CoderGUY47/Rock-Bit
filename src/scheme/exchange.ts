export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  date?: Date;
}

export interface Trade {
  price: number;
  qty: number;
  time: string;
  isBuy: boolean;
  id: string;
}

export interface OrderBookLevel {
  price: number;
  qty: number;
  total: number;
  percentage: number;
}

export interface UserOrder {
  id: string;
  date: string;
  pair: string;
  type: string; // 'Limit' | 'Market' | 'Conditional'
  side: 'Buy' | 'Sell';
  price: number;
  amount: number;
  filled: string;
  total: string;
  triggerConditions: string;
}

// Map from trading symbols to the corresponding items database ID
export const SYMBOL_TO_ID_MAP: Record<string, string> = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'SOL': 'solana',
  'UNI': 'uniswap',
  'AAVE': 'aave',
  'ARB': 'arbitrum',
  'OP': 'optimism',
  'LINK': 'chainlink',
  'BNB': 'bnb',
  'XRP': 'xrp',
  'ADA': 'cardano',
  'AVAX': 'avalanche',
  'DOT': 'polkadot',
  'DOGE': 'dogecoin',
  'SHIB': 'shiba-inu',
  'POL': 'polygon',
  'LTC': 'litecoin',
  'NEAR': 'near',
  'ATOM': 'cosmos'
};

// Timeframe helper in milliseconds
export function getTimeframeMs(timeframe: string): number {
  switch (timeframe) {
    case '1m': return 60 * 1000;
    case '5m': return 5 * 60 * 1000;
    case '15m': return 15 * 60 * 1000;
    case '1h': return 60 * 60 * 1000;
    case '4h': return 4 * 60 * 60 * 1000;
    case '1d': return 24 * 60 * 60 * 1000;
    case '1w': return 7 * 24 * 60 * 60 * 1000;
    default: return 60 * 60 * 1000;
  }
}

// Timeframe format helper
export function formatCandleTime(date: Date, timeframe: string): string {
  if (timeframe.includes('d') || timeframe.includes('w')) {
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  }
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// Generate 40 initial candles for the chart propagating backwards with low volatility
export function generateInitialCandles(baseVal: number, timeframe: string = '1h'): Candle[] {
  const candlesList: Candle[] = [];
  let currentClose = baseVal;
  const now = new Date();
  const stepMs = getTimeframeMs(timeframe);

  for (let i = 0; i < 40; i++) {
    const cTime = new Date(now.getTime() - i * stepMs);
    const volatility = 0.0015; // 0.15% hourly volatility
    const change = currentClose * (Math.random() * volatility * 2 - volatility);
    const close = currentClose;
    const open = currentClose - change;
    const high = Math.max(open, close) + (Math.random() * open * 0.0006);
    const low = Math.min(open, close) - (Math.random() * open * 0.0006);
    const volume = Math.random() * 80 + 20;

    candlesList.unshift({
      time: formatCandleTime(cTime, timeframe),
      open,
      high,
      low,
      close,
      volume,
      date: cTime
    });
    currentClose = open;
  }
  return candlesList;
}

// Generate initial recent trades
export function generateInitialRecentTrades(baseVal: number): Trade[] {
  const tradesList: Trade[] = [];
  const now = new Date();
  for (let i = 0; i < 20; i++) {
    const offset = (Math.random() * 0.01 - 0.005) * baseVal;
    const tradePrice = baseVal + offset;
    const tTime = new Date(now.getTime() - i * 4000);
    tradesList.push({
      id: Math.random().toString(36).substring(2, 9),
      price: tradePrice,
      qty: Math.random() * 2 + 0.01,
      time: tTime.toLocaleTimeString('en-US', { hour12: false }),
      isBuy: Math.random() > 0.46
    });
  }
  return tradesList;
}

export function generateMockOpenOrders(activeSymbol: string, baseVal: number): UserOrder[] {
  const sides: ('Buy' | 'Sell')[] = ['Buy', 'Sell', 'Buy', 'Buy', 'Sell', 'Buy', 'Sell', 'Sell', 'Buy', 'Sell'];
  const types = ['Limit', 'Limit', 'Conditional', 'Limit', 'Limit', 'Conditional', 'Limit', 'Limit', 'Limit', 'Limit'];
  const amounts = [150, 200, 350, 90, 400, 120, 500, 75, 180, 220];
  const priceOffsets = [0.985, 1.012, 0.97, 0.99, 1.025, 0.965, 1.03, 1.04, 0.975, 1.02];
  
  const initialOrders: UserOrder[] = [
    {
      id: 'o-1',
      date: '10-19 12:40:42',
      pair: `${activeSymbol}/USDT`,
      type: 'Limit',
      side: 'Sell',
      price: baseVal * 1.05,
      amount: parseFloat((100 / (baseVal * 1.05)).toFixed(4)),
      filled: '0.00%',
      total: '100.00 USD',
      triggerConditions: '-'
    },
    {
      id: 'o-2',
      date: '10-19 12:36:42',
      pair: `${activeSymbol}/USDT`,
      type: 'Limit',
      side: 'Buy',
      price: baseVal * 0.95,
      amount: parseFloat((250 / (baseVal * 0.95)).toFixed(4)),
      filled: '0.00%',
      total: '250.00 USD',
      triggerConditions: '-'
    }
  ];

  for (let i = 0; i < 10; i++) {
    const oPrice = baseVal * priceOffsets[i];
    const amountVal = amounts[i];
    const qty = parseFloat((amountVal / oPrice).toFixed(4));
    const minutesOffset = 45 + i * 18;
    const dateObj = new Date(Date.now() - minutesOffset * 60 * 1000);
    const dateStr = `${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')} ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}:${String(dateObj.getSeconds()).padStart(2, '0')}`;

    initialOrders.push({
      id: `o-${3 + i}`,
      date: dateStr,
      pair: `${activeSymbol}/USDT`,
      type: types[i],
      side: sides[i],
      price: oPrice,
      amount: qty,
      filled: '0.00%',
      total: `${amountVal.toFixed(2)} USD`,
      triggerConditions: types[i] === 'Conditional' ? `>= ${oPrice.toFixed(2)}` : '-'
    });
  }

  return initialOrders;
}
