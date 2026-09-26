import React, { useState } from 'react';
import { RAHUL_AVATAR, INITIAL_ACTIVE_ORDER, PAST_ORDERS } from '../data/mockData';
import { Order } from '../types';

interface AccountScreenProps {
  onOpenReturnExchange: () => void;
  onOpenLiveGps: () => void;
  onOpenOpsConsole: () => void;
  onShowToast: (msg: string) => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  onOpenReturnExchange,
  onOpenLiveGps,
  onOpenOpsConsole,
  onShowToast
}) => {
  const [activeOrder] = useState<Order>(INITIAL_ACTIVE_ORDER);
  const [pastOrders] = useState<Order[]>(PAST_ORDERS);
  const [coins, setCoins] = useState(450);
  const [whatsAppAlerts, setWhatsAppAlerts] = useState(true);
  const [copiedAwb, setCopiedAwb] = useState(false);

  const handleCopyAwb = (awbText: string) => {
    navigator.clipboard?.writeText(awbText);
    setCopiedAwb(true);
    onShowToast(`AWB ${awbText} copied to clipboard!`);
    setTimeout(() => setCopiedAwb(false), 2000);
  };

  const handleRedeemCoins = () => {
    if (coins > 0) {
      onShowToast(`₹${coins / 10} Coverzo Coins applied to your wallet balance!`);
    } else {
      onShowToast('No coins available to redeem.');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-3 max-w-md mx-auto space-y-4">
      {/* Profile Header Card */}
      <section className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-surface-container-high/60">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                alt="Rahul Sharma"
                className="w-13 h-13 rounded-full object-cover shadow-xs border border-primary/20"
                src={RAHUL_AVATAR}
              />
              <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full p-0.5 flex items-center justify-center">
                <span className="material-symbols-outlined text-[13px]">verified</span>
              </div>
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-on-surface truncate">Rahul Sharma</h1>
              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">smartphone</span>
                +91 98765 43210
              </p>
              <p className="text-[11px] text-on-surface-variant truncate flex items-center gap-1 font-sans">
                <span className="material-symbols-outlined text-[13px]">mail</span>
                rahul.s@example.com
              </p>
            </div>
          </div>

          <button
            aria-label="Edit Profile"
            className="p-2 text-on-surface-variant hover:text-primary rounded-full bg-surface-container-low transition-colors"
            type="button"
            onClick={() => onShowToast('Profile editing enabled')}
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>
        </div>

        {/* Coverzo Club Rewards Pill Banner */}
        <div className="mt-3 p-2.5 bg-primary-fixed rounded-xl flex items-center justify-between border border-primary/15">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[16px]">stars</span>
            </div>
            <div>
              <span className="text-[10px] text-on-primary-fixed-variant uppercase tracking-wider block font-bold">
                Coverzo Club Member
              </span>
              <p className="text-xs text-on-primary-fixed font-bold">
                {coins} Coins{' '}
                <span className="text-[10px] font-normal text-on-primary-fixed-variant">
                  (₹{coins / 10} savings on next drop)
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={handleRedeemCoins}
            className="px-2.5 py-1 bg-surface-container-lowest text-primary text-[11px] font-bold rounded-full shadow-2xs hover:bg-surface transition-all flex items-center gap-0.5 active:scale-95"
            type="button"
          >
            Redeem
            <span className="material-symbols-outlined text-[13px]">chevron_right</span>
          </button>
        </div>

        {/* Quick Shortcuts Grid */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-2 border-t border-surface-container-high/40">
          <a
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer"
            href="#active-order"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <span className="text-[10px] text-on-surface text-center font-bold">Orders</span>
          </a>

          <div
            onClick={() => onShowToast('Wishlist view: 4 items saved')}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              <span className="absolute -top-1 -right-1 bg-secondary-container text-on-secondary text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                4
              </span>
            </div>
            <span className="text-[10px] text-on-surface text-center font-bold">Wishlist</span>
          </div>

          <div
            onClick={() => onShowToast('Bellandur Bengaluru saved address verified')}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
            </div>
            <span className="text-[10px] text-on-surface text-center font-bold">Addresses</span>
          </div>

          <div
            onClick={() => onShowToast('Coverzo 24/7 Care priority chat active')}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </div>
            <span className="text-[10px] text-on-surface text-center font-bold">Support</span>
          </div>
        </div>
      </section>

      {/* High-Priority Active Live Tracking Hero Card */}
      <section
        className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border border-surface-container-high/60 relative overflow-hidden"
        id="active-order"
      >
        <div className="flex items-center justify-between pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-on-surface font-mono">{activeOrder.id}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
            <span className="text-[11px] text-on-surface-variant font-sans">{activeOrder.date}</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping" />
            In Transit
          </span>
        </div>

        {/* Product Summary Micro-View */}
        <div className="p-2.5 bg-surface-container-low rounded-xl flex items-center gap-3 border border-surface-container-high/40">
          <div className="w-13 h-13 rounded-lg bg-surface-container flex items-center justify-center shrink-0 overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={activeOrder.items[0]?.image}
              alt="Ordered item"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xs font-bold text-on-surface truncate">
              {activeOrder.items[0]?.productName}
            </h2>
            <p className="text-[11px] text-on-surface-variant font-sans">
              {activeOrder.items[0]?.variant} • {activeOrder.items[0]?.model} • Qty: 1
            </p>
            <p className="text-xs text-primary font-bold mt-0.5">
              ₹{activeOrder.items[0]?.price}{' '}
              <span className="line-through text-on-surface-variant font-normal text-[10px]">
                ₹{activeOrder.items[0]?.originalPrice}
              </span>
            </p>
          </div>
        </div>

        {/* Logistics & AWB */}
        <div className="mt-2.5 p-2.5 bg-surface-container rounded-xl flex items-center justify-between border border-surface-container-high/60">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-primary text-[18px]">local_shipping</span>
            <div className="truncate">
              <p className="text-[11px] text-on-surface font-bold">{activeOrder.courier}</p>
              <p className="text-[10px] text-on-surface-variant font-mono">
                AWB: <span>{activeOrder.awb}</span>
              </p>
            </div>
          </div>
          <button
            className="px-2.5 py-1 text-primary bg-surface-container-lowest text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
            onClick={() => handleCopyAwb(activeOrder.awb || '849204921')}
            type="button"
          >
            <span className="material-symbols-outlined text-[13px]">
              {copiedAwb ? 'check' : 'content_copy'}
            </span>
            <span>{copiedAwb ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* ETA Alert */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
          <p className="text-xs text-on-surface font-medium font-sans">
            Expected: <span className="text-secondary font-bold">{activeOrder.expectedDelivery}</span>
          </p>
        </div>

        {/* Progress Timeline Stepper */}
        <div className="mt-3 pt-1 space-y-3.5 relative">
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-surface-container-highest" />
          <div className="absolute left-3 top-2 h-2/3 w-0.5 bg-tertiary" />

          {activeOrder.steps?.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-2.5 pl-0.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-surface-container-lowest z-10 shrink-0 ${
                  step.completed
                    ? 'bg-tertiary text-on-tertiary'
                    : step.active
                    ? 'bg-primary text-on-primary ring-primary-fixed shadow-xs animate-pulse'
                    : 'bg-surface-container-high text-outline'
                }`}
              >
                <span className="material-symbols-outlined text-[12px]">{step.icon}</span>
              </div>
              <div className="min-w-0 flex-1 flex justify-between items-baseline">
                <div>
                  <p className={`text-xs font-bold ${step.active ? 'text-primary' : 'text-on-surface'}`}>
                    {step.title}
                  </p>
                  <p className="text-[10px] text-on-surface-variant font-sans">{step.desc}</p>
                </div>
                <span className={`text-[10px] shrink-0 ${step.active ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                  {step.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Active Order Action Buttons */}
        <div className="mt-4 space-y-2">
          <button
            onClick={onOpenLiveGps}
            className="w-full h-11 bg-primary text-on-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all hover:bg-primary/95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">near_me</span>
            <span>Live GPS Map &amp; Route Details</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onShowToast('Connected with Delhivery logistics priority desk')}
              className="h-9 px-3 bg-surface-container text-on-surface rounded-xl text-xs font-semibold flex items-center justify-center gap-1 hover:bg-surface-container-high transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">chat</span>
              Order Support
            </button>
            <button
              onClick={() => onShowToast('Shipment in transit. Courier rerouting request submitted.')}
              className="h-9 px-3 bg-surface-container text-on-surface-variant hover:text-error rounded-xl text-xs font-semibold flex items-center justify-center gap-1 hover:bg-surface-container-high transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">cancel</span>
              Cancel / Modify
            </button>
          </div>
        </div>
      </section>

      {/* Order History */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="font-bold text-sm text-on-surface font-sans">Order History</h2>
          <span className="text-[11px] text-primary font-bold hover:underline cursor-pointer">
            View All ({pastOrders.length + 1})
          </span>
        </div>

        {pastOrders.map((order) => (
          <div
            key={order.id}
            className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-surface-container-high/60 space-y-2.5"
          >
            <div className="flex items-center justify-between pb-1 border-b border-surface-container-high/40">
              <div>
                <span className="text-xs font-bold text-on-surface font-mono">{order.id}</span>
                <p className="text-[10px] text-on-surface-variant">{order.date}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold">
                <span className="material-symbols-outlined text-[13px]">check_circle</span>
                {order.status}
              </span>
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center shrink-0 overflow-hidden border border-surface-container-high/50">
                  <img className="w-full h-full object-cover" src={item.image} alt={item.productName} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-on-surface truncate">{item.productName}</p>
                  <p className="text-[10px] text-on-surface-variant font-sans">
                    {item.model} • {item.variant}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs font-bold text-on-surface">₹{item.price}</span>
                    <span className="text-[9px] text-on-surface-variant bg-surface-container px-1.5 py-0.2 rounded font-sans">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Hassle-Free Return Banner (For item 1) */}
            {order.items.some((i) => i.returnEligible) && (
              <div className="p-2 bg-surface-container-low rounded-lg flex items-center justify-between border border-surface-container-high/40">
                <div className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                  <span className="material-symbols-outlined text-tertiary text-[16px]">verified_user</span>
                  <span>
                    <strong className="text-on-surface">7-Day Return:</strong> 3 days remaining
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-1.5 pt-0.5">
              <button
                onClick={() => onShowToast(`Invoice downloaded for ${order.id}`)}
                className="py-1.5 px-1 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[13px]">receipt_long</span>
                Invoice
              </button>

              <button
                onClick={() => onShowToast(`Added items from ${order.id} to cart`)}
                className="py-1.5 px-1 bg-primary text-on-primary rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-primary/95 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[13px]">replay</span>
                Buy Again
              </button>

              {/* Return Button that launches Return or Exchange flow */}
              {order.items.some((i) => i.returnEligible) ? (
                <button
                  onClick={onOpenReturnExchange}
                  className="py-1.5 px-1 bg-surface-container hover:bg-secondary-fixed text-on-surface hover:text-secondary rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-colors border border-surface-container-high"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[13px]">undo</span>
                  Return / Swap
                </button>
              ) : (
                <button
                  onClick={() => onShowToast('Rating submitted. +50 Coverzo Coins awarded!')}
                  className="py-1.5 px-1 bg-secondary-fixed text-on-secondary-fixed rounded-lg text-[10px] font-bold flex items-center justify-center gap-0.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[13px]">hotel_class</span>
                  Rate (+50)
                </button>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Account Preferences */}
      <section className="space-y-2">
        <h2 className="font-bold text-sm text-on-surface font-sans">Account &amp; Preferences</h2>
        <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-high/60 overflow-hidden divide-y divide-surface-container-high/50">
          <div
            onClick={() => onShowToast('Manage saved addresses')}
            className="p-3 hover:bg-surface-container-low transition-colors flex items-start justify-between cursor-pointer"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-surface-container text-primary mt-0.5">
                <span className="material-symbols-outlined text-[18px]">home_pin</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-on-surface">Saved Addresses</p>
                  <span className="px-1.5 py-0.2 bg-primary-fixed text-on-primary-fixed text-[9px] rounded font-bold">
                    Default
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-0.5 truncate font-sans">
                  Flat 402, Green Glen Layout, Bellandur, Bengaluru
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant text-[18px] self-center">chevron_right</span>
          </div>

          <div
            onClick={() => onShowToast('UPI ID sharma@oksbi active for 1-click refund')}
            className="p-3 hover:bg-surface-container-low transition-colors flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-surface-container text-primary">
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-on-surface">Payment Methods &amp; UPI</p>
                <p className="text-[11px] text-on-surface-variant truncate font-sans">Linked: sharma@oksbi • PhonePe / GPay</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant text-[18px]">chevron_right</span>
          </div>

          <div
            onClick={() => onShowToast('GSTIN 29AAACZ1234F1Z8 verified for Input Tax Credit')}
            className="p-3 hover:bg-surface-container-low transition-colors flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-surface-container text-tertiary">
                <span className="material-symbols-outlined text-[18px]">domain_verification</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-on-surface">GSTIN for Business Billing</p>
                  <span className="material-symbols-outlined text-[13px] text-tertiary">verified</span>
                </div>
                <p className="text-[11px] text-on-surface-variant font-sans">Claim up to 18% Input Tax Credit on accessories</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant text-[18px]">chevron_right</span>
          </div>

          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-[18px]">mark_chat_unread</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-on-surface">WhatsApp Order Alerts</p>
                <p className="text-[11px] text-on-surface-variant font-sans">Get live dispatch &amp; delivery updates directly</p>
              </div>
            </div>
            <button
              onClick={() => {
                setWhatsAppAlerts(!whatsAppAlerts);
                onShowToast(whatsAppAlerts ? 'WhatsApp notifications disabled' : 'WhatsApp notifications active');
              }}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                whatsAppAlerts ? 'bg-primary' : 'bg-surface-container-high'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  whatsAppAlerts ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 24/7 Coverzo Care Support */}
      <section className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-surface-container-high/60 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[20px]">headset_mic</span>
            <h2 className="text-xs font-bold text-on-surface">24/7 Coverzo Care</h2>
          </div>
          <span className="text-[10px] text-tertiary font-bold px-2 py-0.5 rounded-full bg-tertiary-fixed">
            Active Now
          </span>
        </div>
        <p className="text-[11px] text-on-surface-variant font-sans">
          Need help with sizing, fit guarantee, or transit delays? Our support executives respond quickly.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 bg-tertiary-container text-on-tertiary rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:opacity-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            WhatsApp Support
          </a>
          <a
            href="tel:18002683796"
            className="h-10 px-3 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            1800-COVERZO
          </a>
        </div>
      </section>

      {/* Admin Ops Console Access Shortcut Banner */}
      <section className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[18px]">terminal</span>
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">Warehouse Operations Console</p>
            <p className="text-[10px] text-on-surface-variant font-sans">Live dispatches, low SKUs, GST &amp; revenue</p>
          </div>
        </div>
        <button
          onClick={onOpenOpsConsole}
          className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-bold active:scale-95 shadow-2xs transition-all"
        >
          Open Console
        </button>
      </section>

      {/* Logout & Footer */}
      <div className="text-center pt-2 space-y-2">
        <button
          onClick={() => onShowToast('Logged out of demo account')}
          className="w-full py-2.5 bg-surface-container text-error rounded-xl text-xs font-bold hover:bg-error-container/30 transition-colors flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          Log Out of Account
        </button>
        <p className="text-[10px] text-on-surface-variant">Coverzo App v2.4.1 (Build 412) • Crafted with ♥ in Bengaluru</p>
      </div>
    </div>
  );
};
