import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CheckoutScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onBack: () => void;
  onOrderSuccess: (orderTotal: number, paymentMethod: string) => void;
  onShowToast: (msg: string) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onBack,
  onOrderSuccess,
  onShowToast
}) => {
  const [couponCode, setCouponCode] = useState('COVER40');
  const [couponApplied, setCouponApplied] = useState(true);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cards' | 'netbanking' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState({
    name: 'Rahul Sharma',
    tag: 'HOME',
    line1: 'Flat 402, Green Glen Layout, Bellandur',
    city: 'Bengaluru, Karnataka',
    pincode: '560103',
    phone: '+91 98765 43210'
  });

  // Calculate pricing
  const itemsTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const originalTotal = cartItems.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const discountAmount = couponApplied ? (couponCode === 'FIRSTCOVER' ? 100 : 200) : 0;
  const codSurcharge = paymentMethod === 'cod' ? 50 : 0;
  const grandTotal = Math.max(0, itemsTotal - discountAmount + codSurcharge);
  const totalSavings = Math.max(0, originalTotal - itemsTotal + discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCode.trim().toUpperCase();
    if (clean === 'COVER40' || clean === 'FIRSTCOVER' || clean === 'COVER20') {
      setCouponCode(clean);
      setCouponApplied(true);
      setShowCouponInput(false);
      onShowToast(`Coupon ${clean} applied successfully!`);
    } else {
      onShowToast('Invalid coupon code. Try COVER40 or FIRSTCOVER');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    onShowToast('Coupon removed');
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully
      }
      onOrderSuccess(grandTotal, paymentMethod.toUpperCase());
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-36 px-4 pt-2 max-w-md mx-auto space-y-4">
      {/* Checkout Sub-Header */}
      <div className="flex items-center justify-between py-1">
        <button
          onClick={onBack}
          aria-label="Go Back"
          className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-90"
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        <h1 className="font-bold text-sm text-on-surface tracking-tight truncate max-w-[180px]">
          Checkout Flow
        </h1>

        <button
          onClick={() => onShowToast('Cart link shared')}
          aria-label="Share Cart"
          className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-90"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">share</span>
        </button>
      </div>

      {/* Savings Banner */}
      <div className="bg-tertiary-container/10 p-3 rounded-xl flex items-center justify-between border border-tertiary/20">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_mall
          </span>
          <div>
            <p className="text-xs font-bold text-on-surface">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items in Bag
            </p>
            <p className="text-[11px] text-tertiary font-bold font-sans">
              Total Savings ₹{totalSavings.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
        <span className="bg-tertiary/15 text-tertiary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Hot Deal
        </span>
      </div>

      {/* Cart Items List */}
      <section className="flex flex-col gap-2.5">
        {cartItems.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-lowest rounded-xl border border-surface-container-high space-y-2">
            <span className="material-symbols-outlined text-4xl text-outline">shopping_cart</span>
            <p className="text-xs text-on-surface font-bold">Your bag is empty</p>
            <button
              onClick={onBack}
              className="px-4 py-1.5 bg-primary text-on-primary text-xs font-bold rounded-lg"
            >
              Browse Products
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.product.id}
              className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-surface-container-high/60 flex gap-3 relative"
            >
              <div className="w-18 h-22 rounded-lg bg-surface-container-low shrink-0 overflow-hidden flex items-center justify-center p-1 border border-surface-container-high/50">
                <img
                  className="w-full h-full object-contain"
                  src={item.product.images[0]}
                  alt={item.product.name}
                />
              </div>

              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <h2 className="text-xs font-bold text-on-surface truncate">
                      {item.product.name}
                    </h2>
                    <button
                      aria-label="Remove item"
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-outline hover:text-error transition-colors p-1 -mr-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-on-surface-variant truncate font-sans">
                    {item.selectedModel} • {item.selectedColor}
                  </p>
                  <span className="inline-block mt-1 text-[9px] text-secondary font-bold bg-secondary-fixed/50 px-2 py-0.2 rounded-full">
                    In Stock (4 left)
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-extrabold text-on-surface">₹{item.product.price}</span>
                    <span className="text-[10px] text-outline line-through">₹{item.product.originalPrice}</span>
                  </div>

                  <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-surface-container-high/60">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-6 h-6 flex items-center justify-center rounded-md bg-surface-container-lowest text-on-surface shadow-2xs active:scale-95 transition-transform"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">remove</span>
                    </button>
                    <span className="w-6 text-center text-xs text-on-surface font-bold">
                      {item.quantity}
                    </span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-md bg-surface-container-lowest text-on-surface shadow-2xs active:scale-95 transition-transform"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Applied Coupon Card */}
      <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-surface-container-high/60 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed/40 flex items-center justify-center shrink-0 text-tertiary">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-on-surface tracking-wider font-mono">
                  {couponApplied ? couponCode : 'NO COUPON'}
                </span>
                {couponApplied && (
                  <span className="text-[10px] bg-tertiary-container/15 text-tertiary px-1.5 py-0.2 rounded font-bold">
                    Saved ₹{discountAmount}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-on-surface-variant truncate">
                {couponApplied ? 'Coupon applied successfully' : 'Apply promo code to save more'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCouponInput(!showCouponInput)}
            className="text-primary text-xs hover:underline font-bold px-2 py-1"
            type="button"
          >
            {showCouponInput ? 'Cancel' : 'Change'}
          </button>
        </div>

        {showCouponInput && (
          <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-surface-container-high flex gap-2">
            <input
              type="text"
              placeholder="e.g. COVER40, FIRSTCOVER"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="flex-1 bg-surface-container-low px-3 py-1.5 rounded-lg text-xs font-mono uppercase text-on-surface outline-none border border-surface-container-high focus:border-primary"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-primary text-on-primary text-xs font-bold rounded-lg"
            >
              Apply
            </button>
            {couponApplied && (
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="px-2 py-1.5 text-error text-xs hover:underline"
              >
                Remove
              </button>
            )}
          </form>
        )}
      </div>

      {/* Deliver To Card */}
      <section className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-surface-container-high/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
            <h3 className="text-xs font-bold text-on-surface font-sans">Deliver To</h3>
          </div>
          <button
            onClick={() => setShowAddressModal(true)}
            className="text-primary text-xs hover:underline font-bold"
            type="button"
          >
            Change Address
          </button>
        </div>

        <div className="bg-surface-container-low/80 p-2.5 rounded-lg border border-surface-container-high/40">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-on-surface">{address.name}</span>
            <span className="bg-surface-container-highest text-on-surface-variant text-[9px] px-1.5 py-0.2 rounded font-bold">
              {address.tag}
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-relaxed font-sans">
            {address.line1}, {address.city} • {address.pincode}
          </p>
          <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">call</span>
            {address.phone}
          </p>
        </div>
      </section>

      {/* Order Summary */}
      <section className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-surface-container-high/60">
        <h3 className="text-xs font-bold text-on-surface mb-2.5 flex items-center gap-1.5 font-sans">
          <span className="material-symbols-outlined text-primary text-[18px]">receipt_long</span>
          Order Summary
        </h3>

        <div className="flex flex-col gap-1.5 text-xs font-sans">
          <div className="flex justify-between text-on-surface-variant">
            <span>Items Total ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
            <span className="text-on-surface font-medium">₹{itemsTotal.toLocaleString('en-IN')}</span>
          </div>

          {couponApplied && (
            <div className="flex justify-between text-tertiary font-bold">
              <span>Instant Coupon ({couponCode})</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}

          <div className="flex justify-between text-on-surface-variant">
            <span>Shipping Fee</span>
            <div className="flex items-center gap-1">
              <span className="text-outline line-through text-[11px]">₹99</span>
              <span className="text-tertiary font-bold uppercase text-[10px]">FREE EXPRESS</span>
            </div>
          </div>

          {paymentMethod === 'cod' && (
            <div className="flex justify-between text-secondary font-medium">
              <span>COD Handling Charge</span>
              <span>+₹50</span>
            </div>
          )}

          <div className="flex justify-between text-on-surface-variant text-[10px] pt-0.5 border-t border-surface-container-high/40">
            <span>Includes 18% GST (CGST ₹76.12 + SGST ₹76.12)</span>
            <span className="text-outline">Included</span>
          </div>

          <div className="mt-1.5 pt-2 bg-surface-container-low p-2.5 rounded-lg flex justify-between items-center border border-surface-container-high/50">
            <div>
              <span className="text-xs font-bold text-on-surface block">Grand Total</span>
              <span className="text-[10px] text-tertiary font-bold">
                You saved ₹{totalSavings.toLocaleString('en-IN')} in total
              </span>
            </div>
            <span className="font-display text-xl font-extrabold text-on-surface">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </section>

      {/* Payment Method Selector */}
      <section className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-surface-container-high/60">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-on-surface flex items-center gap-1.5 font-sans">
            <span className="material-symbols-outlined text-primary text-[18px]">payments</span>
            Payment Method
          </h3>
          <span className="text-[10px] text-tertiary font-bold bg-tertiary-fixed/30 px-2 py-0.5 rounded-full">
            100% Encrypted
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* UPI */}
          <label
            onClick={() => setPaymentMethod('upi')}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
              paymentMethod === 'upi'
                ? 'bg-primary-fixed/20 border-primary shadow-2xs'
                : 'bg-surface-container-low border-transparent hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                className="w-4 h-4 text-primary accent-primary"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-on-surface">UPI Fast Intent</span>
                  <span className="bg-secondary-container text-on-secondary text-[9px] px-1.5 py-0.2 rounded font-bold">
                    Extra 5% OFF
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant font-sans">Google Pay, PhonePe, Paytm, CRED</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
          </label>

          {/* Cards */}
          <label
            onClick={() => setPaymentMethod('cards')}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
              paymentMethod === 'cards'
                ? 'bg-primary-fixed/20 border-primary shadow-2xs'
                : 'bg-surface-container-low border-transparent hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cards'}
                onChange={() => setPaymentMethod('cards')}
                className="w-4 h-4 text-primary accent-primary"
              />
              <div>
                <span className="text-xs font-bold text-on-surface">Credit / Debit Card</span>
                <p className="text-[11px] text-on-surface-variant font-sans">Visa, Mastercard, RuPay</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">credit_card</span>
          </label>

          {/* NetBanking */}
          <label
            onClick={() => setPaymentMethod('netbanking')}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
              paymentMethod === 'netbanking'
                ? 'bg-primary-fixed/20 border-primary shadow-2xs'
                : 'bg-surface-container-low border-transparent hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'netbanking'}
                onChange={() => setPaymentMethod('netbanking')}
                className="w-4 h-4 text-primary accent-primary"
              />
              <div>
                <span className="text-xs font-bold text-on-surface">NetBanking</span>
                <p className="text-[11px] text-on-surface-variant font-sans">HDFC, ICICI, SBI, Axis &amp; all banks</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">account_balance</span>
          </label>

          {/* COD */}
          <label
            onClick={() => setPaymentMethod('cod')}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
              paymentMethod === 'cod'
                ? 'bg-primary-fixed/20 border-primary shadow-2xs'
                : 'bg-surface-container-low border-transparent hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="w-4 h-4 text-primary accent-primary"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-on-surface">Cash on Delivery</span>
                  <span className="bg-surface-container-highest text-on-surface-variant text-[9px] px-1.5 py-0.2 rounded font-bold">
                    +₹50
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant font-sans">Verify mobile OTP on arrival</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">local_shipping</span>
          </label>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="bg-surface-container-low p-2.5 rounded-xl text-center border border-surface-container-high/50">
        <div className="flex items-center justify-center gap-3 text-on-surface-variant text-[11px]">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">verified_user</span>
            <span>Razorpay Verified</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-tertiary">lock</span>
            <span>256-Bit SSL</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-secondary">published_with_changes</span>
            <span>7-Day Returns</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl px-4 py-3 border-t border-surface-container-high/70 shadow-lg" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}>
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex flex-col shrink-0 min-w-[70px]">
            <span className="text-[10px] text-outline uppercase font-bold">To Pay</span>
            <span className="text-base font-extrabold text-on-surface">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={handlePay}
            disabled={isProcessing || cartItems.length === 0}
            className="flex-1 h-12 py-3 px-4 bg-primary text-on-primary rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(79,70,229,0.4)] active:scale-[0.98] transition-all hover:bg-primary/95 disabled:opacity-50"
            type="button"
          >
            {isProcessing ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  lock
                </span>
                <span>
                  {paymentMethod === 'upi' && `Pay ₹${grandTotal} via UPI`}
                  {paymentMethod === 'cards' && `Pay ₹${grandTotal} via Card`}
                  {paymentMethod === 'netbanking' && `Pay ₹${grandTotal} via NetBanking`}
                  {paymentMethod === 'cod' && `Place Order (₹${grandTotal} COD)`}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Change Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-4 space-y-3 border border-surface-container-high shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-on-surface">Edit Delivery Address</h3>
              <button onClick={() => setShowAddressModal(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Full Name"
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                className="w-full p-2 rounded-lg bg-surface-container-low border border-surface-container-high"
              />
              <input
                type="text"
                placeholder="Flat / Building"
                value={address.line1}
                onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                className="w-full p-2 rounded-lg bg-surface-container-low border border-surface-container-high"
              />
              <input
                type="text"
                placeholder="City, State"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full p-2 rounded-lg bg-surface-container-low border border-surface-container-high"
              />
              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                className="w-full p-2 rounded-lg bg-surface-container-low border border-surface-container-high"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="w-full p-2 rounded-lg bg-surface-container-low border border-surface-container-high"
              />
            </div>

            <button
              onClick={() => {
                setShowAddressModal(false);
                onShowToast('Delivery address updated');
              }}
              className="w-full py-2 bg-primary text-on-primary text-xs font-bold rounded-lg"
            >
              Save Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
