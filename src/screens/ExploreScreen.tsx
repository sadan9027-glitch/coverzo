import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';

interface ExploreScreenProps {
  activeModel: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onChangeModel: () => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  activeModel,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onChangeModel,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Catalog' },
    { id: 'magsafe', label: 'MagSafe' },
    { id: 'matte', label: 'Matte Finish' },
    { id: 'armor', label: 'Drop Armor' },
    { id: 'clear', label: 'Clear Pure-Gel' },
    { id: 'glass', label: 'Tempered Glass' },
  ];

  let filtered = PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-3 max-w-md mx-auto space-y-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-on-surface">Explore Catalog</h2>
          <button
            onClick={onChangeModel}
            className="text-xs text-primary font-bold bg-primary-fixed px-2.5 py-1 rounded-full flex items-center gap-1 active:scale-95 transition-transform"
          >
            <span>{activeModel}</span>
            <span className="material-symbols-outlined text-[14px]">tune</span>
          </button>
        </div>
        <p className="text-xs text-on-surface-variant font-sans">
          Engineered exclusively for {activeModel} port & camera dimensions.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
          search
        </span>
        <input
          type="text"
          placeholder="Filter by finish, material, feature..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface outline-none border border-surface-container-high focus:border-primary font-sans"
        />
      </div>

      {/* Horizontal Category Strip */}
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
        <div className="flex items-center gap-1.5 min-w-max pb-1">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                  isActive
                    ? 'bg-inverse-surface text-inverse-on-surface shadow-2xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort row & Results count */}
      <div className="flex items-center justify-between text-xs text-on-surface-variant">
        <span>Showing {filtered.length} products</span>
        <div className="flex items-center gap-1">
          <span className="text-[11px]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-surface-container text-on-surface text-xs rounded-lg px-2 py-1 outline-none font-bold border border-surface-container-high"
          >
            <option value="featured">Featured</option>
            <option value="rating">Top Rated (★)</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 gap-2.5">
        {filtered.map((product) => {
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
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary text-[9px] font-bold shadow-2xs">
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
                <p className="text-[10px] text-on-surface-variant truncate font-sans">
                  {product.subtitle}
                </p>

                <div className="flex items-baseline gap-1.5 pt-0.5">
                  <span className="text-xs font-extrabold text-on-surface">₹{product.price}</span>
                  <span className="text-[10px] text-on-surface-variant line-through">₹{product.originalPrice}</span>
                  <span className="text-[10px] text-tertiary font-bold">{product.discountPercent}% off</span>
                </div>
              </div>

              <button
                className="mt-2.5 w-full py-1.5 rounded-lg bg-inverse-surface text-inverse-on-surface hover:bg-primary hover:text-on-primary text-[11px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1 shadow-2xs"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
              >
                <span className="material-symbols-outlined text-[15px]">add_shopping_cart</span>
                <span>Add to Bag</span>
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
};
