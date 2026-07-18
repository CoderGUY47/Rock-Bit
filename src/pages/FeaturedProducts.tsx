"use client";

import Link from "next/link";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  sparkline: string;
  color: string;
}

const FEATURED_COINS: Coin[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 92500,
    change24h: 2.4,
    color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20",
    sparkline: "M0,15 Q10,12 20,8 T40,12 T60,2 T80,5 T100,2",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3450,
    change24h: -1.2,
    color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20",
    sparkline: "M0,5 Q10,10 20,15 T40,12 T60,18 T80,14 T100,16",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 210,
    change24h: 5.8,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-950/20",
    sparkline: "M0,18 Q10,14 20,10 T40,6 T60,8 T80,2 T100,1",
  },
  {
    id: "ripple",
    name: "Ripple",
    symbol: "XRP",
    price: 1.15,
    change24h: 12.4,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20",
    sparkline: "M0,15 Q10,12 20,8 T40,4 T60,1 T80,2 T100,0",
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "BNB",
    price: 580,
    change24h: 0.5,
    color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
    sparkline: "M0,12 Q10,12 20,10 T40,11 T60,8 T80,9 T100,7",
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.62,
    change24h: -2.1,
    color: "text-cyan-500 bg-cyan-50 dark:bg-cyan-950/20",
    sparkline: "M0,5 Q10,8 20,12 T40,15 T60,12 T80,18 T100,19",
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.38,
    change24h: 18.2,
    color: "text-orange-500 bg-orange-50 dark:bg-orange-950/20",
    sparkline: "M0,19 Q10,15 20,10 T40,4 T60,8 T80,2 T100,0",
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    price: 6.2,
    change24h: -0.8,
    color: "text-pink-500 bg-pink-50 dark:bg-pink-950/20",
    sparkline: "M0,10 Q10,8 20,12 T40,11 T60,15 T80,13 T100,14",
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#141416] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Trending Markets
            </h2>
            <p className="mt-2 text-sm text-[#777e90] dark:text-[#b1b5c3]">
              Live updates of the top performing assets traded on Rock-Bit.
            </p>
          </div>
          <Link
            href="/markets"
            className="px-6 py-3 border border-gray-200 dark:border-gray-800 rounded-full text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shrink-0"
          >
            All Markets
          </Link>
        </div>

        {/* Coins Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_COINS.map((coin) => (
            <div
              key={coin.id}
              className="bg-white dark:bg-[#1f2128] border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${coin.color}`}
                    >
                      {coin.symbol}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                        {coin.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">
                        {coin.symbol}/USD
                      </p>
                    </div>
                  </div>

                  {/* Change badge */}
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      coin.change24h >= 0
                        ? "bg-success/10 text-success"
                        : "bg-critical/10 text-critical"
                    }`}
                  >
                    {coin.change24h >= 0 ? "+" : ""}
                    {coin.change24h}%
                  </span>
                </div>

                {/* Price */}
                <p className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  $
                  {coin.price >= 1
                    ? coin.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })
                    : coin.price.toFixed(4)}
                </p>
              </div>

              {/* Sparkline & Trade Button */}
              <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800/60 pt-4 mt-2">
                <div className="w-20 h-8">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 100 20"
                  >
                    <path
                      d={coin.sparkline}
                      fill="none"
                      stroke={coin.change24h >= 0 ? "#58BD7D" : "#D33535"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <Link
                  href={`/checkout?coin=${coin.symbol}`}
                  className="px-4 py-2 bg-primary hover:bg-[#2e72d2] text-white text-xs font-bold rounded-xl transition-all hover:scale-105 active:scale-95"
                >
                  Trade
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
