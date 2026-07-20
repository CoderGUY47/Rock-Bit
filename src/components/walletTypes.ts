// Shared wallet types & data
export type Step = 1 | 2 | 3 | 4;
export type Mode = 'overview' | 'buy' | 'sell';

export type Currency = {
  id: string;
  label: string;
  type: 'fiat' | 'crypto';
  usdRate: number;
};

export type CoinInfo = {
  name: string;
  pair: string;
  change: string;
  price: number;
  exchange: number;
  spot: number;
  available: number;
  balanceDisplay: string;
  color: string;
  chartColor: string;
  isUp: boolean;
  unit: string;
};

export const coinData: Record<string, CoinInfo> = {
  USDT: { name: 'Tether USD',     pair: 'USDT/USDC', change: '+12.96%', price: 1.001964,  exchange: 10075.56, spot: 0.0,    available: 0.00004989, balanceDisplay: '1.00069787 USDC', color: '#3b82f6', chartColor: '#ef4444', isUp: true,  unit: 'USDT' },
  BTC:  { name: 'Bitcoin',        pair: 'BTC/USDT',  change: '+2.45%',  price: 64513.27,  exchange: 1.0,      spot: 0.356,  available: 0.0,         balanceDisplay: '1.35600000 BTC',  color: '#f59e0b', chartColor: '#58bd7d', isUp: true,  unit: 'BTC'  },
  ETH:  { name: 'Ethereum',       pair: 'ETH/USDT',  change: '-1.20%',  price: 3522.70,   exchange: 10.0,     spot: 5.42,   available: 0.0,         balanceDisplay: '15.42000000 ETH', color: '#8b5cf6', chartColor: '#ef4444', isUp: false, unit: 'ETH'  },
  SOL:  { name: 'Solana',         pair: 'SOL/USDT',  change: '+5.82%',  price: 150.0,     exchange: 100.0,    spot: 24.5,   available: 0.0,         balanceDisplay: '124.50000000 SOL',color: '#10b981', chartColor: '#58bd7d', isUp: true,  unit: 'SOL'  },
  USDC: { name: 'USD Coin',       pair: 'USDC/USDT', change: '+0.01%',  price: 1.0,       exchange: 1.0,      spot: 0.00069787, available: 0.0,    balanceDisplay: '1.00069787 USDC', color: '#2563eb', chartColor: '#58bd7d', isUp: true,  unit: 'USDC' },
  BNB:  { name: 'Binance Coin',   pair: 'BNB/USDT',  change: '+1.88%',  price: 580.00,    exchange: 4.5,      spot: 1.25,   available: 0.0,         balanceDisplay: '5.75000000 BNB',  color: '#f3ba2f', chartColor: '#58bd7d', isUp: true,  unit: 'BNB'  },
  XRP:  { name: 'Ripple',         pair: 'XRP/USDT',  change: '-0.45%',  price: 0.60,      exchange: 500.0,    spot: 120.0,  available: 0.0,         balanceDisplay: '620.00000000 XRP',color: '#23292f', chartColor: '#ef4444', isUp: false, unit: 'XRP'  },
  ADA:  { name: 'Cardano',        pair: 'ADA/USDT',  change: '+3.12%',  price: 0.38,      exchange: 1500.0,   spot: 300.0,  available: 0.0,         balanceDisplay: '1800.00000000 ADA',color:'#0033ad', chartColor: '#58bd7d', isUp: true,  unit: 'ADA'  },
  AVAX: { name: 'Avalanche',      pair: 'AVAX/USDT', change: '+0.78%',  price: 28.50,     exchange: 25.0,     spot: 5.0,    available: 0.0,         balanceDisplay: '30.00000000 AVAX',color: '#e84142', chartColor: '#58bd7d', isUp: true,  unit: 'AVAX' },
  NEAR: { name: 'Near Protocol',  pair: 'NEAR/USDT', change: '+4.55%',  price: 5.20,      exchange: 80.0,     spot: 15.0,   available: 0.0,         balanceDisplay: '95.00000000 NEAR',color: '#000000', chartColor: '#58bd7d', isUp: true,  unit: 'NEAR' },
};

export const BASE_CURRENCIES: Currency[] = [
  { id: 'VND',  label: 'VND',  type: 'fiat',   usdRate: 0.000043 },
  { id: 'USD',  label: 'USD',  type: 'fiat',   usdRate: 1.0      },
  { id: 'EUR',  label: 'EUR',  type: 'fiat',   usdRate: 1.09     },
  { id: 'GBP',  label: 'GBP',  type: 'fiat',   usdRate: 1.28     },
  { id: 'USDT', label: 'USDT', type: 'crypto', usdRate: 1.00     },
  { id: 'BTC',  label: 'BTC',  type: 'crypto', usdRate: 64513.27 },
  { id: 'ETH',  label: 'ETH',  type: 'crypto', usdRate: 3522.70  },
  { id: 'SOL',  label: 'SOL',  type: 'crypto', usdRate: 150.00   },
  { id: 'USDC', label: 'USDC', type: 'crypto', usdRate: 1.00     },
  { id: 'BNB',  label: 'BNB',  type: 'crypto', usdRate: 580.00   },
  { id: 'XRP',  label: 'XRP',  type: 'crypto', usdRate: 0.60     },
  { id: 'ADA',  label: 'ADA',  type: 'crypto', usdRate: 0.38     },
  { id: 'AVAX', label: 'AVAX', type: 'crypto', usdRate: 28.50    },
  { id: 'NEAR', label: 'NEAR', type: 'crypto', usdRate: 5.20     },
];

export const COINGECKO_TO_SYMBOL: Record<string, string> = {
  bitcoin: 'BTC', ethereum: 'ETH', solana: 'SOL', tether: 'USDT',
  bnb: 'BNB', xrp: 'XRP', cardano: 'ADA', avalanche: 'AVAX', near: 'NEAR',
};

export function getCoinImg(id: string) {
  return id === 'NEAR' ? '/assets/coins/near.png' : `/assets/coins/${id.toLowerCase()}.svg`;
}
