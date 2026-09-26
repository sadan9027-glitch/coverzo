import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';

interface HomeScreenProps {
  activeModel: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onChangeModel: () => void;
  onShowToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  activeModel,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onChangeModel,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All Cases');
  const [pincode, setPincode] = useState('560001');
  const [pincodeVerified, setPincodeVerified] = useState(false);
  const [pincodeError, setPincodeError] = useState('');

  const brands = [
    { id: 'apple', name: 'Apple', icon: 'phone_iphone', count: '140+ styles' },
    { id: 'samsung', name: 'Samsung', icon: 'smartphone', count: '98 styles' },
    { id: 'oneplus', name: 'OnePlus', icon: 'add_circle', count: '64 styles' },
    { id: 'nothing', name: 'Nothing', icon: 'lightbulb', count: '32 styles' },
    { id: 'vivo', name: 'Vivo', icon: 'camera', count: '45 styles' },
    { id: 'xiaomi', name: 'Xiaomi', icon: 'devices', count: '58 styles' },
  ];

  const categories = [
    'All Cases',
    'MagSafe',
    'Matte Finish',
    'Tempered Glass',
    'Armor & Drop',
    'Clear Gel'
  ];

  const handlePincodeCheck = () => {
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setPincodeVerified(true);
      setPincodeError('');
      onShowToast(`Delivery validated for PIN ${pincode}`);
    } else {
      setPincodeVerified(false);
      setPincodeError('Please enter a valid 6-digit Indian PIN');
    }
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All Cases' ||
      (selectedCategory === 'MagSafe' && p.category === 'magsafe') ||
      (selectedCategory === 'Matte Finish' && p.category === 'matte') ||
      (selectedCategory === 'Tempered Glass' && p.category === 'glass') ||
      (selectedCategory === 'Armor & Drop' && p.category === 'armor') ||
      (selectedCategory === 'Clear Gel' && p.category === 'clear');

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full pb-28 space-y-4 px-4 pt-3 max-w-md mx-auto">
      {/* Search & Voice/Lens Utility Bar */}
      <section className="w-full">
        <div className="flex items-center gap-2 bg-surface-container-low px-3.5 py-2.5 rounded-xl shadow-xs border border-surface-container-high/60 focus-within:border-primary/50 focus-within:bg-surface-container-lowest transition-all">
          <span className="material-symbols-outlined text-[20px] text-primary">search</span>
          <input
            className="bg-transparent flex-1 text-on-surface placeholder:text-on-surface-variant/70 text-xs sm:text-sm outline-none min-w-0 font-sans"
            placeholder="Search cases, tempered glass, MagSafe..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-outline hover:text-on-surface p-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              aria-label="Voice Search"
              className="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors active:scale-90"
              type="button"
              onClick={() => onShowToast('Listening for voice search...')}
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
            <button
              aria-label="Visual Search Lens"
              className="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors active:scale-90"
              type="button"
              onClick={() => onShowToast('Visual camera lens scanner active')}
            >
              <span className="material-symbols-outlined text-[18px]">center_focus_strong</span>
            </button>
          </div>
        </div>
      </section>

      {/* Active Model Verification Strip */}
      <section className="w-full">
        <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-surface-container-high/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-sans text-on-surface-variant uppercase tracking-wider">Shopping for</span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-tertiary-container/15 text-tertiary text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[12px]">verified</span>
                  Fit Guarantee
                </span>
              </div>
              <p className="font-bold text-sm text-on-surface truncate">{activeModel}</p>
            </div>
          </div>
          <button
            className="shrink-0 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-dim text-xs font-bold text-on-surface transition-transform active:scale-95 flex items-center gap-1"
            onClick={onChangeModel}
            type="button"
          >
            <span>Change</span>
            <span className="material-symbols-outlined text-[16px]">tune</span>
          </button>
        </div>
      </section>

      {/* Hero Highlight Carousel Card */}
      <section className="w-full relative overflow-hidden rounded-2xl bg-inverse-surface text-inverse-on-surface shadow-md">
        <div className="relative p-4 sm:p-5 flex flex-col justify-between min-h-[170px] z-10">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[13px]">bolt</span> Flash Drop
            </span>
            <span className="text-[11px] bg-surface-container-highest/20 backdrop-blur-md px-2 py-0.5 rounded text-inverse-on-surface">1/3</span>
          </div>

          <div className="space-y-1 my-2">
            <h2 className="font-display text-xl sm:text-2xl font-black leading-tight text-surface-container-lowest tracking-tight">
              FROST MATTE SERIES
            </h2>
            <p className="text-xs text-surface-dim/90 font-sans">
              Zero fingerprints. Featherweight frame. Precision MagSafe click.
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5 bg-surface-container-lowest/15 px-2.5 py-1 rounded-lg">
              <span className="text-[11px] text-secondary-fixed">CODE:</span>
              <span className="text-xs font-extrabold text-surface-container-lowest tracking-wider font-mono">COVER40</span>
            </div>
            <button
              onClick={() => onSelectProduct(PRODUCTS[0])}
              className="px-3.5 py-2 rounded-lg bg-primary-container text-on-primary text-xs font-bold shadow-md active:scale-95 transition-all flex items-center gap-1"
              type="button"
            >
              <span>Shop Now</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Ambient glowing backdrop blobs */}
        <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-primary-container/30 blur-2xl pointer-events-none" />
        <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full bg-secondary-container/20 blur-xl pointer-events-none" />
      </section>

      {/* Indian Pincode Fast Check Widget */}
      <section className="w-full">
        <div className="bg-surface-container-low rounded-xl p-3 shadow-xs border border-surface-container-high/60 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              <span className="text-xs font-bold text-on-surface">Express Delivery Checker</span>
            </div>
            <span className="text-[11px] text-tertiary flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> 2-Day Guaranteed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              className="flex-1 bg-surface-container-lowest text-on-surface px-3 py-2 rounded-lg text-xs outline-none placeholder:text-on-surface-variant/60 border border-surface-container-high focus:border-primary font-sans"
              placeholder="Enter 6-digit PIN (e.g. 560001)"
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <button
              className="px-4 py-2 rounded-lg bg-inverse-surface text-inverse-on-surface text-xs font-bold active:scale-95 transition-all"
              onClick={handlePincodeCheck}
              type="button"
            >
              Check
            </button>
          </div>

          {pincodeVerified && (
            <p className="text-[11px] text-tertiary flex items-center gap-1 font-bold animate-in fade-in">
              <span className="material-symbols-outlined text-[15px] text-tertiary">schedule</span>
              <span>Eligible for <strong>Next-Day Dispatch</strong> to {pincode} via Delhivery Express</span>
            </p>
          )}

          {pincodeError && (
            <p className="text-[11px] text-error flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[15px]">error</span>
              <span>{pincodeError}</span>
            </p>
          )}
        </div>
      </section>

      {/* Quick Brand Selector Circles */}
      <section className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-on-surface font-sans">Explore by Device Brand</h3>
          <button
            onClick={onChangeModel}
            className="text-[11px] text-primary font-bold hover:underline"
            type="button"
          >
            View All 18+
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
          {brands.map((brand) => {
            const isBrandActive = selectedBrand === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => {
                  setSelectedBrand(isBrandActive ? 'all' : brand.id);
                  onShowToast(`Browsing ${brand.name} lineup`);
                }}
                className="flex flex-col items-center gap-1 shrink-0 group active:scale-95 transition-transform"
                type="button"
              >
                <div
                  className={`w-13 h-13 rounded-full flex items-center justify-center transition-colors shadow-xs border ${
                    isBrandActive
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface-container-lowest text-on-surface border-surface-container-high group-hover:bg-primary-fixed'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">{brand.icon}</span>
                </div>
                <span className="text-xs text-on-surface font-bold font-sans">{brand.name}</span>
                <span className="text-[9px] text-on-surface-variant -mt-0.5">{brand.count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Category Filter Pill Chips */}
      <section className="w-full">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isCatActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 ${
                  isCatActive
                    ? 'bg-inverse-surface text-inverse-on-surface shadow-xs'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
                type="button"
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Flash Deals & Bestsellers Grid */}
      <section className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-on-surface font-sans">Trending Cases</h3>
            <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-extrabold animate-pulse">
              HOT DEALS
            </span>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">
            {filteredProducts.length} designs available
          </span>
        </div>

        {/* 2-Column High Density Product Card Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <article
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-surface-container-lowest rounded-xl p-2.5 shadow-xs border border-surface-container-high/60 flex flex-col justify-between group cursor-pointer hover:border-primary/40 transition-all"
              >
                <div className="relative w-full aspect-square rounded-lg bg-surface-container-low overflow-hidden mb-2">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary text-[10px] font-bold shadow-xs">
                      {product.badge}
                    </span>
                  )}
                  <button
                    aria-label={`Wishlist ${product.name}`}
                    className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center transition-colors active:scale-90 ${
                      isWishlisted ? 'text-secondary-container' : 'text-on-surface-variant hover:text-secondary-container'
                    }`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-[11px] font-bold text-on-surface">{product.rating}</span>
                    <span className="text-[10px] text-on-surface-variant">({product.reviewCount})</span>
                  </div>

                  <h4 className="text-xs font-bold text-on-surface line-clamp-1 leading-snug">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant truncate font-sans">
                    {product.subtitle}
                  </p>

                  <div className="flex items-baseline gap-1.5 pt-0.5">
                    <span className="text-sm font-extrabold text-on-surface">₹{product.price}</span>
                    <span className="text-[10px] text-on-surface-variant line-through">₹{product.originalPrice}</span>
                    <span className="text-[10px] text-tertiary font-bold">{product.discountPercent}% off</span>
                  </div>
                </div>

                <button
                  className="mt-2.5 w-full py-2 rounded-lg bg-inverse-surface text-inverse-on-surface hover:bg-primary hover:text-on-primary text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1 shadow-xs"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                >
                  <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                  <span>Add to Cart</span>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* Trust & Service Badges (Optimized for Indian Shoppers) */}
      <section className="w-full pt-1">
        <div className="grid grid-cols-2 gap-2.5 bg-surface-container-low p-3.5 rounded-xl shadow-xs border border-surface-container-high/60">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            </div>
            <div>
              <h5 className="text-xs text-on-surface font-bold leading-tight">Free Express Delivery</h5>
              <p className="text-[10px] text-on-surface-variant">Pan-India fast logistics</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
            <div>
              <h5 className="text-xs text-on-surface font-bold leading-tight">Cash On Delivery</h5>
              <p className="text-[10px] text-on-surface-variant">UPI & COD accepted</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">published_with_changes</span>
            </div>
            <div>
              <h5 className="text-xs text-on-surface font-bold leading-tight">7-Day Free Returns</h5>
              <p className="text-[10px] text-on-surface-variant">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim text-on-primary-fixed-variant flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div>
              <h5 className="text-xs text-on-surface font-bold leading-tight">100% Fit Guarantee</h5>
              <p className="text-[10px] text-on-surface-variant">Replacement if model fails</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
