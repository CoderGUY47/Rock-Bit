import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { UserOrder } from '@/scheme/exchange';

interface OrdersTableProps {
  bottomTableTab: 'open' | 'history' | 'trades' | 'funds';
  setBottomTableTab: (t: 'open' | 'history' | 'trades' | 'funds') => void;
  openOrders: UserOrder[];
  tradeHistory: UserOrder[];
  availableBalance: number;
  equity: number;
  activeSymbol: string;
  btcPrice: number;
  cancelOrder: (id: string) => void;
  triggerNotification: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  bottomTableTab,
  setBottomTableTab,
  openOrders,
  tradeHistory,
  availableBalance,
  equity,
  activeSymbol,
  btcPrice,
  cancelOrder,
  triggerNotification
}) => {
  const tabClass = (tab: string) =>
    `pb-2 relative cursor-pointer ${
      bottomTableTab === tab
        ? 'text-gray-900 dark:text-white font-semibold'
        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
    }`;

  return (
    <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-4 flex-1 flex flex-col">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/[0.04] pb-2 mb-3">
        <div className="flex gap-6 text-xs font-semibold uppercase tracking-wider select-none">
          <button onClick={() => setBottomTableTab('open')} className={tabClass('open')}>
            Open Orders ({openOrders.length})
            {bottomTableTab === 'open' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
          <button onClick={() => setBottomTableTab('history')} className={tabClass('history')}>
            Order History
            {bottomTableTab === 'history' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
          <button onClick={() => setBottomTableTab('trades')} className={tabClass('trades')}>
            Trade History
            {bottomTableTab === 'trades' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
          <button onClick={() => setBottomTableTab('funds')} className={tabClass('funds')}>
            Funds
            {bottomTableTab === 'funds' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
        </div>
        <button onClick={() => triggerNotification('All orders cancelled successfully.', 'success')} className="text-primary hover:text-[#6366f1] text-[10px] font-bold uppercase tracking-wider cursor-pointer">
          Cancel All
        </button>
      </div>

      <div className="overflow-auto flex-1 min-h-0 max-h-[260px]">
        {bottomTableTab === 'open' && (
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-white/[0.02] select-none">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Pair</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Side</th>
                <th className="py-2.5 px-3 text-right">Price</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-right">Filled</th>
                <th className="py-2.5 px-3 text-right">Total</th>
                <th className="py-2.5 px-3">Trigger Conditions</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.02]">
              {openOrders.length > 0 ? openOrders.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors font-medium">
                  <td className="py-3 px-3 text-gray-500">{o.date}</td>
                  <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">{o.pair}</td>
                  <td className="py-3 px-3">
                    <span className="bg-gray-100 dark:bg-[#1f2026] text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-sm text-[10px] font-medium">{o.type}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${o.side === 'Buy' ? 'bg-[#58bd7d]/10 text-[#58bd7d]' : 'bg-[#d33535]/10 text-[#d33535]'}`}>{o.side}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-gray-800 dark:text-gray-200">{o.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-3 text-right font-medium text-gray-700 dark:text-gray-300">{o.amount.toFixed(4)}</td>
                  <td className="py-3 px-3 text-right text-gray-400 font-semibold">{o.filled}</td>
                  <td className="py-3 px-3 text-right font-semibold text-gray-900 dark:text-white">{o.total}</td>
                  <td className="py-3 px-3 text-gray-500 font-normal">{o.triggerConditions}</td>
                  <td className="py-3 px-3 text-right">
                    <button onClick={() => cancelOrder(o.id)} className="text-[#d33535] hover:text-red-500 font-semibold hover:bg-red-500/10 p-1.5 rounded-md transition-all cursor-pointer" title="Cancel Order">
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={10} className="py-8 text-center text-gray-400 font-medium">No open orders</td></tr>
              )}
            </tbody>
          </table>
        )}

        {bottomTableTab === 'history' && (
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-white/[0.02] select-none">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Pair</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Side</th>
                <th className="py-2.5 px-3 text-right">Price</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-right">Filled</th>
                <th className="py-2.5 px-3 text-right">Total</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.02]">
              {openOrders.length > 0 ? openOrders.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors font-medium">
                  <td className="py-3 px-3 text-gray-500">{o.date}</td>
                  <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">{o.pair}</td>
                  <td className="py-3 px-3"><span className="bg-gray-100 dark:bg-[#1f2026] text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-sm text-[10px] font-medium">{o.type}</span></td>
                  <td className="py-3 px-3"><span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${o.side === 'Buy' ? 'bg-[#58bd7d]/10 text-[#58bd7d]' : 'bg-[#d33535]/10 text-[#d33535]'}`}>{o.side}</span></td>
                  <td className="py-3 px-3 text-right font-semibold text-gray-800 dark:text-gray-200">{o.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-3 text-right font-medium text-gray-700 dark:text-gray-300">{o.amount.toFixed(4)}</td>
                  <td className="py-3 px-3 text-right text-gray-400 font-semibold">{o.filled}</td>
                  <td className="py-3 px-3 text-right font-semibold text-gray-900 dark:text-white">{o.total}</td>
                  <td className="py-3 px-3 text-[#58bd7d] font-semibold">Filled</td>
                </tr>
              )) : (
                <tr><td colSpan={9} className="py-8 text-center text-gray-400 font-medium">No order history available</td></tr>
              )}
            </tbody>
          </table>
        )}

        {bottomTableTab === 'trades' && (
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-white/[0.02] select-none">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Pair</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Side</th>
                <th className="py-2.5 px-3 text-right">Price</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.02]">
              {tradeHistory.length > 0 ? tradeHistory.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors font-medium">
                  <td className="py-3 px-3 text-gray-500">{t.date}</td>
                  <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">{t.pair}</td>
                  <td className="py-3 px-3"><span className="bg-gray-100 dark:bg-[#1f2026] text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-sm text-[10px] font-medium">{t.type}</span></td>
                  <td className="py-3 px-3"><span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${t.side === 'Buy' ? 'bg-[#58bd7d]/10 text-[#58bd7d]' : 'bg-[#d33535]/10 text-[#d33535]'}`}>{t.side}</span></td>
                  <td className="py-3 px-3 text-right font-semibold text-gray-800 dark:text-gray-200">{t.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-3 text-right font-medium text-gray-700 dark:text-gray-300">{t.amount.toFixed(4)}</td>
                  <td className="py-3 px-3 text-right font-semibold text-gray-900 dark:text-white">{t.total}</td>
                </tr>
              )) : (
                <tr><td colSpan={7} className="py-8 text-center text-gray-400 font-medium">No executed trades in current session</td></tr>
              )}
            </tbody>
          </table>
        )}

        {bottomTableTab === 'funds' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 text-xs select-none">
            {[
              { label: 'Total Assets Valuation', val: `${equity.toFixed(8)} BTC`, sub: `≈ $${(equity * btcPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD`, subColor: 'text-gray-500' },
              { label: 'Available Margin', val: `${availableBalance.toFixed(8)} BTC`, sub: `≈ $${(availableBalance * btcPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD`, subColor: 'text-gray-500' },
              { label: 'Position Margin', val: '0.02800000 BTC', sub: 'Locked in derivatives', subColor: 'text-gray-400' },
              { label: 'Unrealized PnL', val: '+0.00342500 BTC', sub: '+6.58%', subColor: 'text-[#58bd7d]', valColor: 'text-[#58bd7d]' },
            ].map(({ label, val, sub, subColor, valColor }) => (
              <div key={label} className="bg-gray-50 dark:bg-[#1f2026] border border-gray-200 dark:border-white/[0.04] p-4 rounded-md">
                <p className="text-gray-400 font-semibold uppercase text-[9px] tracking-wider mb-1">{label}</p>
                <p className={`text-base font-semibold ${valColor || 'text-gray-900 dark:text-white'}`}>{val}</p>
                <p className={`text-[10px] mt-1 font-semibold ${subColor}`}>{sub}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
