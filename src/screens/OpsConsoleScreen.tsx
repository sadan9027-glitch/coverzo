import React, { useState } from 'react';

interface OpsConsoleScreenProps {
  onBackToStore: () => void;
  onShowToast: (msg: string) => void;
}

export const OpsConsoleScreen: React.FC<OpsConsoleScreenProps> = ({
  onBackToStore,
  onShowToast
}) => {
  const [dateFilter, setDateFilter] = useState('Today (IST)');
  const [activeTab, setActiveTab] = useState<'overview' | 'skus' | 'dispatches' | 'returns'>('overview');
  const [restockedSkus, setRestockedSkus] = useState<{ [key: string]: boolean }>({});
  const [packedOrders, setPackedOrders] = useState<{ [key: string]: boolean }>({});

  const dateOptions = ['Today (IST)', 'Yesterday (IST)', 'Last 7 Days'];

  const cycleDateFilter = () => {
    const nextIdx = (dateOptions.indexOf(dateFilter) + 1) % dateOptions.length;
    const next = dateOptions[nextIdx];
    setDateFilter(next);
    onShowToast(`Date filter updated: ${next}`);
  };

  const handleRestockPo = (skuName: string) => {
    setRestockedSkus((prev) => ({ ...prev, [skuName]: true }));
    onShowToast(`Purchase Order PO-2025-992 generated for ${skuName}`);
  };

  const handlePackAndScan = (orderId: string) => {
    setPackedOrders((prev) => ({ ...prev, [orderId]: true }));
    onShowToast(`Order ${orderId} scanned & packed into Delhivery courier bag`);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-3 max-w-md mx-auto space-y-4">
      {/* Ops Header & Live Monitor */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-xs">
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold text-on-surface tracking-tight">Ops Console</h1>
                <span className="px-2 py-0.2 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[10px] uppercase font-bold tracking-wide">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant flex items-center gap-1 font-sans">
                <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                <span className="font-bold text-tertiary">Store Active</span> • 42 Live Shoppers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={cycleDateFilter}
              className="min-h-[36px] px-2.5 py-1 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-1 text-on-surface text-xs font-bold"
              type="button"
            >
              <span>{dateFilter}</span>
              <span className="material-symbols-outlined text-[15px] text-on-surface-variant">expand_more</span>
            </button>

            <button
              onClick={onBackToStore}
              title="Return to Storefront"
              className="w-9 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface text-xs font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </button>
          </div>
        </div>

        {/* Quick Ops Segmented Horizontal Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'overview', label: 'Overview', icon: 'insights' },
            { id: 'skus', label: 'SKUs (Low: 3)', icon: 'inventory_2' },
            { id: 'dispatches', label: 'Dispatches (28)', icon: 'local_shipping' },
            { id: 'returns', label: 'Returns & RTO', icon: 'assignment_return' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-2xs whitespace-nowrap active:scale-95 transition-all ${
                  isActive
                    ? 'bg-on-surface text-surface'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2x2 Key Financial & Operations Matrix */}
      <section className="grid grid-cols-2 gap-2.5">
        {/* Revenue */}
        <div className="p-3 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full bg-primary/5 pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
              Gross Revenue
            </span>
            <span className="p-1 rounded-lg bg-surface-container text-primary">
              <span className="material-symbols-outlined text-[15px]">payments</span>
            </span>
          </div>
          <div className="mt-2">
            <div className="text-base font-extrabold text-on-surface tracking-tight font-display">
              ₹84,650
            </div>
            <div className="flex items-center gap-0.5 mt-0.5 text-tertiary text-[10px] font-bold">
              <span className="material-symbols-outlined text-[13px]">arrow_upward</span>
              <span>+18.4%</span>
              <span className="text-on-surface-variant font-normal">vs y'day</span>
            </div>
          </div>
        </div>

        {/* Orders Placed */}
        <div className="p-3 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full bg-secondary-container/5 pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
              Orders Placed
            </span>
            <span className="p-1 rounded-lg bg-surface-container text-secondary-container">
              <span className="material-symbols-outlined text-[15px]">shopping_cart_checkout</span>
            </span>
          </div>
          <div className="mt-2">
            <div className="text-base font-extrabold text-on-surface tracking-tight font-display">94</div>
            <div className="flex items-center gap-1 mt-0.5 text-[10px]">
              <span className="px-1.5 py-0.2 rounded bg-primary-fixed text-on-primary-fixed font-bold">
                78 UPI
              </span>
              <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant">
                16 COD
              </span>
            </div>
          </div>
        </div>

        {/* Net Margin */}
        <div className="p-3 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full bg-tertiary/5 pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
              Net Margin
            </span>
            <span className="p-1 rounded-lg bg-surface-container text-tertiary">
              <span className="material-symbols-outlined text-[15px]">query_stats</span>
            </span>
          </div>
          <div className="mt-2">
            <div className="text-base font-extrabold text-on-surface tracking-tight font-display">64.2%</div>
            <div className="text-[10px] text-on-surface-variant mt-0.5 truncate font-sans">
              Profit: <span className="font-bold text-on-surface">₹54,345</span>
            </div>
          </div>
        </div>

        {/* To Dispatch */}
        <div className="p-3 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full bg-secondary/5 pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
              To Dispatch
            </span>
            <span className="p-1 rounded-lg bg-surface-container text-secondary">
              <span className="material-symbols-outlined text-[15px]">package_2</span>
            </span>
          </div>
          <div className="mt-2">
            <div className="text-base font-extrabold text-secondary-container tracking-tight font-display">
              28 <span className="text-xs text-on-surface-variant font-normal">ready</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5 text-on-surface-variant text-[10px]">
              <span className="material-symbols-outlined text-[13px] text-tertiary">verified</span>
              <span className="truncate">Delhivery AWB synced</span>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Inventory Threshold Alert */}
      <section className="p-3 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-ping" />
            <h2 className="text-xs font-bold text-on-surface">Inventory Alert • 3 SKUs Low</h2>
          </div>
          <button
            onClick={() => onShowToast('Full warehouse inventory report opened')}
            className="text-[10px] text-primary font-bold hover:underline"
            type="button"
          >
            View All
          </button>
        </div>

        <div className="space-y-2">
          {/* SKU 1 */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low border border-surface-container-high/40">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-highest overflow-hidden shrink-0 border border-surface-container-high">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOMcra0PvQW9GdeMXLbuGVXsN0GS88VWCt3jY2yIhcUfVt30qOpRbaPoPlsWG54CARqgH8l0MCiIwgNpCQquNeQjxWa4tPn_DL9JmgIig_4IEPIZDyKiVpKPy7EZBlcorqoxtfbkdXbbDADZ0x-COZqu4cUZrYf-ffQGAYt45XbAmTQ6SUSoL-JpwgE36whVLS0skU5r5hfZFGr5bYf3cVf9BM8ZKZ0R3WQBRxKxTF_TyEusxyiiLTZQ"
                  alt="Frosted Black iPhone 15 Pro"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-on-surface truncate">iPhone 15 Pro • Frosted Black</p>
                <p className="text-[10px] text-secondary font-bold">Only 4 units left in Hub 1</p>
              </div>
            </div>

            <button
              onClick={() => handleRestockPo('iPhone 15 Pro Frosted Black')}
              className={`min-h-[32px] px-3 py-1 rounded-lg text-[10px] font-bold transition-all shrink-0 ${
                restockedSkus['iPhone 15 Pro Frosted Black']
                  ? 'bg-tertiary-fixed text-tertiary font-bold'
                  : 'bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface'
              }`}
              type="button"
            >
              {restockedSkus['iPhone 15 Pro Frosted Black'] ? 'PO Sent ✓' : 'Restock PO'}
            </button>
          </div>

          {/* SKU 2 */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low border border-surface-container-high/40">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-highest overflow-hidden shrink-0 border border-surface-container-high">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCUr_274pllmPgjrKeQabFzjSxf0UU2jc0mJmGVvJ1Dvvy7Y3LWckCkOv7YkIvFnQoMC6w70EcJZVfhWefQJHUK1SlocE2B5MH0R9PZSBMzu_ouHGY6SuSOPO0tD--CUrPM47esdHM0qy5jWm2_aEDAnMTNRrh5ba2AcZJzVnMAMj1Xs_fFHeKC2O0F96k6Y8_s7LxI_laNWJGTzDGmlaU_p7mr4OQnGHXqhN24P48ICPEalY0V7cqqA"
                  alt="S24 Ultra Titanium Armor"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-on-surface truncate">S24 Ultra • Titanium Armor</p>
                <p className="text-[10px] text-error font-bold">CRITICAL: 2 units left</p>
              </div>
            </div>

            <button
              onClick={() => handleRestockPo('S24 Ultra Titanium Armor')}
              className={`min-h-[32px] px-3 py-1 rounded-lg text-[10px] font-bold shadow-2xs transition-all shrink-0 ${
                restockedSkus['S24 Ultra Titanium Armor']
                  ? 'bg-tertiary-fixed text-tertiary font-bold'
                  : 'bg-secondary-container text-on-secondary hover:opacity-95'
              }`}
              type="button"
            >
              {restockedSkus['S24 Ultra Titanium Armor'] ? 'PO Sent ✓' : 'Urgent PO'}
            </button>
          </div>
        </div>
      </section>

      {/* Realtime Dispatch Feed */}
      <section className="p-3 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
            <h2 className="text-xs font-bold text-on-surface">Realtime Dispatch Feed</h2>
          </div>
          <span className="text-[10px] text-on-surface-variant font-bold">Auto-sync 30s</span>
        </div>

        <div className="space-y-2">
          {/* Order 1 */}
          <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5 border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-on-surface font-mono">#CVZ-10492</span>
                <span className="px-1.5 py-0.2 rounded-full bg-tertiary/15 text-tertiary text-[9px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                  CONFIRMED (UPI)
                </span>
              </div>
              <span className="text-xs font-bold text-on-surface">₹998</span>
            </div>

            <div className="flex items-center justify-between text-on-surface-variant text-[11px] font-sans">
              <span className="truncate">Rahul S. • Koramangala, Bengaluru</span>
              <span className="text-[10px] shrink-0">4m ago</span>
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <button
                onClick={() => onShowToast('Thermal shipping label printed on Zebra GK420t')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-surface-container text-on-surface text-[10px] font-bold hover:bg-surface-container-high transition-colors"
                type="button"
              >
                Print Shipping Label
              </button>
              <button
                onClick={() => handlePackAndScan('#CVZ-10492')}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all ${
                  packedOrders['#CVZ-10492']
                    ? 'bg-tertiary-fixed text-tertiary font-bold'
                    : 'bg-primary text-on-primary hover:bg-primary/95'
                }`}
                type="button"
              >
                {packedOrders['#CVZ-10492'] ? 'Scanned ✓' : 'Pack & Scan'}
              </button>
            </div>
          </div>

          {/* Order 2 */}
          <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5 border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-on-surface font-mono">#CVZ-10491</span>
                <span className="px-1.5 py-0.2 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[9px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">local_shipping</span>
                  SHIPPED
                </span>
              </div>
              <span className="text-xs font-bold text-on-surface">₹1,499</span>
            </div>

            <div className="flex items-center justify-between text-on-surface-variant text-[11px] font-sans">
              <span className="truncate">Priya M. • Bandra West, Mumbai</span>
              <span className="text-[10px] shrink-0">22m ago</span>
            </div>

            <div className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant text-[10px] flex items-center justify-between font-mono">
              <span>Delhivery: #849204921</span>
              <span className="text-tertiary font-bold">In Transit</span>
            </div>
          </div>

          {/* Order 3 */}
          <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5 border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-on-surface font-mono">#CVZ-10490</span>
                <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[9px] font-bold">
                  PACKED (COD)
                </span>
              </div>
              <span className="text-xs font-bold text-on-surface">₹799</span>
            </div>

            <div className="flex items-center justify-between text-on-surface-variant text-[11px] font-sans">
              <span className="truncate">Amit K. • Rohini Sector 14, Delhi</span>
              <span className="text-[10px] shrink-0">1h ago</span>
            </div>
          </div>
        </div>
      </section>

      {/* Warehouse & Accounts Actions */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-bold text-on-surface font-sans">Warehouse &amp; Accounts Actions</h2>
        <div className="grid grid-cols-2 gap-2">
          {/* Manifest Action */}
          <button
            onClick={() => onShowToast('Generated Delhivery Master Manifest (28 packages)')}
            className="p-2.5 rounded-xl bg-surface-container-lowest shadow-2xs border border-surface-container-high/60 hover:bg-surface-container transition-colors flex items-center gap-2 text-left"
            type="button"
          >
            <div className="w-7 h-7 rounded-lg bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-on-surface truncate">Delhivery Manifest</div>
              <div className="text-[9px] text-on-surface-variant truncate">Bulk 28 AWBs</div>
            </div>
          </button>

          {/* Barcode Scan */}
          <button
            onClick={() => onShowToast('Bluetooth 2D Barcode scanner linked')}
            className="p-2.5 rounded-xl bg-surface-container-lowest shadow-2xs border border-surface-container-high/60 hover:bg-surface-container transition-colors flex items-center gap-2 text-left"
            type="button"
          >
            <div className="w-7 h-7 rounded-lg bg-tertiary/15 text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">barcode_scanner</span>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-on-surface truncate">Stock In Scan</div>
              <div className="text-[9px] text-on-surface-variant truncate">Camera / BT Scanner</div>
            </div>
          </button>

          {/* Discount Coupons */}
          <button
            onClick={() => onShowToast('Coupon COVERZO20 active for today flash drop')}
            className="p-2.5 rounded-xl bg-surface-container-lowest shadow-2xs border border-surface-container-high/60 hover:bg-surface-container transition-colors flex items-center gap-2 text-left"
            type="button"
          >
            <div className="w-7 h-7 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">sell</span>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-on-surface truncate">Flash Coupons</div>
              <div className="text-[9px] text-on-surface-variant truncate">COVERZO20 Active</div>
            </div>
          </button>

          {/* GSTR-1 GST Report */}
          <button
            onClick={() => onShowToast('GSTR-1 CSV exported for CA GST filing')}
            className="p-2.5 rounded-xl bg-surface-container-lowest shadow-2xs border border-surface-container-high/60 hover:bg-surface-container transition-colors flex items-center gap-2 text-left"
            type="button"
          >
            <div className="w-7 h-7 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">download</span>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-on-surface truncate">GSTR-1 Export</div>
              <div className="text-[9px] text-on-surface-variant truncate">CSV for CA filing</div>
            </div>
          </button>
        </div>
      </section>

      {/* Hourly Real-Time Order Velocity Sparkline */}
      <section className="p-3 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-on-surface">Hourly Dispatch Velocity</h3>
            <p className="text-[10px] text-on-surface-variant font-sans">Peak traffic: 2:00 PM - 5:00 PM</p>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded bg-tertiary/15 text-tertiary font-bold">
            Optimal Speed
          </span>
        </div>

        {/* Micro Bar Chart SVG */}
        <div className="h-20 w-full pt-1">
          <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 60">
            <rect fill="#eae7ea" height="22" rx="3" width="14" x="10" y="38" />
            <rect fill="#eae7ea" height="16" rx="3" width="14" x="35" y="44" />
            <rect fill="#eae7ea" height="30" rx="3" width="14" x="60" y="30" />
            <rect fill="#e2dfff" height="36" rx="3" width="14" x="85" y="24" />
            <rect fill="#3525cd" height="44" rx="3" width="14" x="110" y="16" />
            <rect fill="#3525cd" height="50" rx="3" width="14" x="135" y="10" />
            <rect fill="#3525cd" height="42" rx="3" width="14" x="160" y="18" />
            <rect fill="#e2dfff" height="32" rx="3" width="14" x="185" y="28" />
            <rect fill="#eae7ea" height="24" rx="3" width="14" x="210" y="36" />
            <rect fill="#eae7ea" height="18" rx="3" width="14" x="235" y="42" />
            <rect fill="#ff5722" height="38" rx="3" width="14" x="260" y="22" />
          </svg>
        </div>

        <div className="flex justify-between text-on-surface-variant text-[10px] px-1 font-mono">
          <span>10 AM</span>
          <span>1 PM</span>
          <span>4 PM (Current)</span>
          <span>9 PM</span>
        </div>
      </section>
    </div>
  );
};
