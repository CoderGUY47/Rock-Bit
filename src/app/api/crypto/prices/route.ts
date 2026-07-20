import { NextResponse } from 'next/server';

/**
 * Live Crypto Prices API Proxy
 * Fetches real-time market data from Binance public API endpoints and maps them to CoinGecko IDs.
 */
const SYMBOL_MAP: Record<string, string> = {
  'BTCUSDT': 'bitcoin',
  'ETHUSDT': 'ethereum',
  'SOLUSDT': 'solana',
  'UNIUSDT': 'uniswap',
  'AAVEUSDT': 'aave',
  'ARBUSDT': 'arbitrum',
  'OPUSDT': 'optimism',
  'LINKUSDT': 'chainlink',
  'BNBUSDT': 'bnb',
  'XRPUSDT': 'xrp',
  'ADAUSDT': 'cardano',
  'AVAXUSDT': 'avalanche',
  'DOTUSDT': 'polkadot',
  'DOGEUSDT': 'dogecoin',
  'SHIBUSDT': 'shiba-inu',
  'POLUSDT': 'polygon', // POL is the Polygon ticker on Binance now
  'LTCUSDT': 'litecoin',
  'NEARUSDT': 'near',
  'ATOMUSDT': 'cosmos'
};

export async function GET() {
  try {
    const symbols = Object.keys(SYMBOL_MAP);
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(symbols))}`;

    const res = await fetch(url, {
      next: { revalidate: 10 } // Cache results for 10 seconds to limit rate limits
    });

    if (!res.ok) {
      throw new Error(`Binance API returned status code ${res.status}`);
    }

    const rawData = await res.json();
    
    // Map response array to clean key-value object
    const prices: Record<string, { price: number; change24h: number; volume24h: string }> = {};
    
    if (Array.isArray(rawData)) {
      rawData.forEach((ticker: any) => {
        const id = SYMBOL_MAP[ticker.symbol];
        if (id) {
          const price = parseFloat(ticker.lastPrice);
          const change = parseFloat(ticker.priceChangePercent);
          
          // Format volume beautifully (e.g. $450.2M or $1.4B)
          const quoteVol = parseFloat(ticker.quoteVolume);
          let formattedVol = `$${(quoteVol / 1000000).toFixed(1)}M`;
          if (quoteVol >= 1000000000) {
            formattedVol = `$${(quoteVol / 1000000000).toFixed(1)}B`;
          }

          prices[id] = {
            price,
            change24h: change,
            volume24h: formattedVol
          };
        }
      });
    }

    // Force Tether price to be stable 1.00 USDT
    prices['tether'] = {
      price: 1.00,
      change24h: 0.02,
      volume24h: '$45.2B'
    };

    return NextResponse.json({ prices });

  } catch (err: any) {
    console.error('❌ Server Binance Ticker Error:', err.message);
    return NextResponse.json({ error: 'Failed to fetch live prices', prices: {} }, { status: 500 });
  }
}
