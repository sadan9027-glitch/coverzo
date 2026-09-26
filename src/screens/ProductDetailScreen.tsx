import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  activeModel: string;
  onBack: () => void;
  onAddToCart: (product: Product, color: string) => void;
  onBuyNow: (product: Product, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onShowToast: (msg: string) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  activeModel,
  onBack,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onShowToast,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Deep Space Black');
  const [pincode, setPincode] = useState('560001');
  const [pinStatus, setPinStatus] = useState<string>('Delivery by Thursday, 28 Mar to Bengaluru');
  const [isPinValid, setIsPinValid] = useState(true);

  const handlePincodeCheck = () => {
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setIsPinValid(true);
      setPinStatus(`Delivery by Thursday to PIN ${pincode}`);
      onShowToast(`Delivery confirmed to PIN ${pincode}`);
    } else {
      setIsPinValid(false);
      setPinStatus('Please enter a valid 6-digit Indian PIN code');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Coverzo!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onShowToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col w-full pb-36 px-4 pt-2 max-w-md mx-auto space-y-4">
      {/* Product Detail Sub-Header */}
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
          Product Detail
        </h1>

        <button
          onClick={handleShare}
          aria-label="Share Case"
          className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-90"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">share</span>
        </button>
      </div>

      {/* Top Gallery Carousel */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-surface-container-low shadow-sm border border-surface-container-high/60">
        <div className="relative aspect-square w-full flex items-center justify-center p-3 bg-white">
          <img
            className="w-full h-full object-contain drop-shadow-md transition-opacity duration-200"
            src={product.images[selectedImageIndex] || product.images[0]}
            alt={product.name}
          />
        </div>

        {/* Floating Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="inline-flex items-center gap-1 bg-secondary-container text-on-primary text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wider uppercase">
            <span className="material-symbols-outlined text-[13px]">bolt</span>
            Flash Deal Drop
          </span>
          <span className="inline-flex items-center gap-1 bg-tertiary-container text-on-tertiary text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
            In Stock (Ready to Ship)
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          aria-label="Add to Wishlist"
          className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center shadow-md active:scale-90 transition-all z-10 ${
            isWishlisted ? 'text-secondary-container' : 'text-on-surface'
          }`}
          onClick={() => onToggleWishlist(product.id)}
          type="button"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {isWishlisted ? 'favorite' : 'favorite_border'}
          </span>
        </button>

        {/* Carousel controls & thumbnail indicators */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1 bg-surface/80 backdrop-blur-md p-1 rounded-full shadow-sm">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedImageIndex === idx ? 'w-5 bg-primary' : 'bg-outline-variant hover:bg-on-surface-variant'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="bg-inverse-surface/80 text-inverse-on-surface backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1 font-mono">
            <span className="material-symbols-outlined text-[14px]">photo_camera</span>
            <span>{selectedImageIndex + 1} / {product.images.length}</span>
          </div>
        </div>
      </section>

      {/* Image Thumbnail Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {product.images.map((imgUrl, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImageIndex(idx)}
            className={`w-14 h-14 rounded-xl overflow-hidden bg-white border-2 shrink-0 transition-all p-1 ${
              selectedImageIndex === idx ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-surface-container-high opacity-70 hover:opacity-100'
            }`}
          >
            <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>

      {/* Title & Pricing Section */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="bg-primary-fixed text-on-primary-fixed text-xs font-bold px-2.5 py-1 rounded-md">
            {activeModel}
          </span>
          <div className="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-md">
            <span className="material-symbols-outlined text-secondary-container text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="text-xs text-on-surface font-bold">{product.rating}</span>
            <span className="text-on-surface-variant text-[11px]">({product.reviewCount} reviews)</span>
          </div>
        </div>

        <h2 className="font-display text-xl sm:text-2xl text-on-surface font-black tracking-tight leading-tight">
          {product.name}
        </h2>
        <p className="text-xs text-on-surface-variant -mt-1 font-sans">
          {product.tagline}
        </p>

        {/* Pricing Row */}
        <div className="mt-1 flex items-baseline gap-2.5">
          <span className="font-display text-3xl font-extrabold text-on-surface tracking-tight">
            ₹{product.price}
          </span>
          <span className="text-base text-on-surface-variant line-through opacity-70">
            ₹{product.originalPrice}
          </span>
          <span className="bg-secondary-fixed text-on-secondary-fixed text-xs px-2 py-0.5 rounded font-extrabold">
            {product.discountPercent}% OFF
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px] font-sans">
          <span className="material-symbols-outlined text-[15px] text-tertiary">verified</span>
          Inclusive of all GST taxes • 100% Original Coverzo Guarantee
        </div>
      </section>

      {/* Color Selector */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-on-surface">Select Color:</span>
          <span className="text-xs text-primary font-bold">{selectedColor}</span>
        </div>

        <div className="flex items-center gap-3">
          {product.colors.map((color) => {
            const isColorActive = selectedColor === color.name;
            return (
              <button
                key={color.name}
                aria-label={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`relative flex items-center justify-center w-11 h-11 rounded-full p-1 transition-all ${
                  isColorActive ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-105'
                }`}
                type="button"
              >
                <span
                  className="w-full h-full rounded-full shadow-inner flex items-center justify-center text-white border border-black/10"
                  style={{ backgroundColor: color.hex }}
                >
                  {isColorActive && (
                    <span className="material-symbols-outlined text-[16px] drop-shadow-sm">check</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Value & Bank Offers Card */}
      <section className="bg-surface-container-low rounded-2xl p-3.5 shadow-xs border border-surface-container-high/60 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">local_offer</span>
          <h3 className="font-bold text-xs text-on-surface uppercase tracking-wider">Available Offers</h3>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2 bg-surface rounded-xl p-2.5 shadow-2xs border border-surface-container-high/40">
            <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">account_balance_wallet</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-on-surface">10% Instant UPI Cashback</span>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] px-1.5 py-0.2 rounded font-bold">
                  RAZORPAY
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant">Pay via Google Pay, PhonePe, or Paytm at checkout. No code required.</p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-surface rounded-xl p-2.5 shadow-2xs border border-surface-container-high/40">
            <span className="material-symbols-outlined text-secondary-container text-[18px] shrink-0 mt-0.5">percent</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-on-surface">Extra ₹100 Flat OFF</span>
                <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
                  FIRSTCOVER
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant">Applicable on your very first order across site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Feature Bento Grid */}
      <section className="flex flex-col gap-2.5 pt-1">
        <h3 className="font-bold text-sm text-on-surface font-sans">Engineering Highlights</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {product.features.map((feat, idx) => (
            <div key={idx} className="bg-surface-container-low p-3 rounded-2xl flex flex-col gap-1 shadow-xs border border-surface-container-high/50">
              <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[16px]">{feat.icon}</span>
              </div>
              <span className="text-xs font-bold text-on-surface">{feat.title}</span>
              <span className="text-[11px] text-on-surface-variant leading-relaxed font-sans">{feat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pincode Checker & Delivery Availability */}
      <section className="bg-surface-container-low rounded-2xl p-3.5 shadow-xs border border-surface-container-high/60 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-on-surface">Delivery &amp; COD Availability</span>
          <span className="text-[11px] text-tertiary font-bold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">flash_on</span> Express Shipping
          </span>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">pin_drop</span>
            <input
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs font-sans border border-surface-container-high"
              maxLength={6}
              placeholder="Enter 6-digit PIN"
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <button
            className="h-10 px-4 rounded-xl bg-surface-container-highest text-on-surface text-xs font-bold active:scale-95 transition-transform"
            onClick={handlePincodeCheck}
            type="button"
          >
            Check
          </button>
        </div>

        {/* Live Status Banner */}
        <div className="bg-surface rounded-xl p-2.5 shadow-2xs border border-surface-container-high/40 flex flex-col gap-1">
          <div className={`flex items-center gap-1.5 text-xs font-bold ${isPinValid ? 'text-tertiary' : 'text-error'}`}>
            <span className="material-symbols-outlined text-[16px]">
              {isPinValid ? 'check_circle' : 'error'}
            </span>
            <span>{pinStatus}</span>
          </div>
          {isPinValid && (
            <div className="flex items-center gap-2 text-on-surface-variant text-[10px] pl-5">
              <span className="flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[13px] text-tertiary">payments</span> Cash on Delivery (COD)
              </span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[13px] text-tertiary">local_shipping</span> Free Shipping
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews Preview */}
      <section className="flex flex-col gap-2.5 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-on-surface font-sans">Customer Stories</h3>
            <span className="bg-surface-container-high text-on-surface text-[10px] font-bold px-2 py-0.5 rounded-full">
              4.9 / 5.0
            </span>
          </div>
          <button className="text-primary text-xs font-bold flex items-center" type="button">
            View All <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {/* Review 1 */}
          <div className="bg-surface-container-low p-3 rounded-2xl shadow-xs border border-surface-container-high/50 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed text-xs flex items-center justify-center font-bold">
                  AK
                </span>
                <div>
                  <p className="text-xs font-bold text-on-surface">Arjun Kulkarni</p>
                  <p className="text-[10px] text-on-surface-variant">Indiranagar, Bengaluru • {activeModel}</p>
                </div>
              </div>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] px-2 py-0.5 rounded-full flex items-center gap-0.5 font-bold">
                <span className="material-symbols-outlined text-[12px]">verified</span> Verified Buyer
              </span>
            </div>

            <div className="flex text-secondary-container">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
            </div>

            <p className="text-xs text-on-surface leading-relaxed font-sans">
              “Genuinely astonished by the build quality. The frosted back looks sick with the Natural Titanium finish showing subtly through. MagSafe grip on my car dashboard mount is super sturdy!”
            </p>
          </div>

          {/* Review 2 */}
          <div className="bg-surface-container-low p-3 rounded-2xl shadow-xs border border-surface-container-high/50 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs flex items-center justify-center font-bold">
                  PS
                </span>
                <div>
                  <p className="text-xs font-bold text-on-surface">Priya Sharma</p>
                  <p className="text-[10px] text-on-surface-variant">Bandra West, Mumbai • {activeModel}</p>
                </div>
              </div>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] px-2 py-0.5 rounded-full flex items-center gap-0.5 font-bold">
                <span className="material-symbols-outlined text-[12px]">verified</span> Verified Buyer
              </span>
            </div>

            <div className="flex text-secondary-container">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
            </div>

            <p className="text-xs text-on-surface leading-relaxed font-sans">
              “Got it delivered within 24 hours in Mumbai! Zero fingerprints, nice tactile click on the action button, doesn't feel bulky at all.”
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl px-4 py-3 border-t border-surface-container-high/70 shadow-lg" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}>
        <div className="max-w-md mx-auto flex items-center gap-3">
          {/* Total Price Pill */}
          <div className="flex flex-col shrink-0 min-w-[76px]">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Total</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-on-surface">₹{product.price}</span>
            </div>
          </div>

          {/* Add to Bag */}
          <button
            className="flex-1 h-11 rounded-xl bg-surface-container-highest text-on-surface text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-2xs hover:bg-surface-container-high"
            type="button"
            onClick={() => onAddToCart(product, selectedColor)}
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Add to Bag</span>
          </button>

          {/* Instant Buy Now */}
          <button
            className="flex-1 h-11 rounded-xl bg-primary text-on-primary text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-[0_8px_20px_-4px_rgba(53,37,205,0.4)] active:scale-95 transition-all hover:bg-primary/95"
            type="button"
            onClick={() => onBuyNow(product, selectedColor)}
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
