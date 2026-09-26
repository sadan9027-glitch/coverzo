import React, { useState } from 'react';
import { LOGO_URL, USER_AVATAR } from '../data/mockData';

interface HeaderProps {
  activeModel: string;
  cartCount: number;
  wishlistCount: number;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenModelSelector: () => void;
  onOpenSearch: () => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  isFramed: boolean;
  onToggleFramed: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeModel,
  cartCount,
  wishlistCount,
  currentTab,
  onSelectTab,
  onOpenModelSelector,
  onOpenSearch,
  isAdmin,
  onToggleAdmin,
  isFramed,
  onToggleFramed
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/60 transition-all">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand & Model Selector Pill */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-transform active:scale-95"
            aria-label="Coverzo Home"
          >
            <img
              alt="Coverzo Brand Logo"
              className="h-8 w-auto object-contain shrink-0"
              src={LOGO_URL}
            />
          </button>

          <button
            onClick={onOpenModelSelector}
            className="min-h-[38px] px-3 py-1 flex items-center gap-1 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors active:scale-95 border border-surface-container-high"
            type="button"
            title="Click to change your smartphone model"
          >
            <span className="font-sans text-xs font-bold text-on-surface truncate max-w-[110px] sm:max-w-[130px]">
              {activeModel}
            </span>
            <span className="material-symbols-outlined text-[16px] text-primary">keyboard_arrow_down</span>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1">
          {/* Quick Search */}
          <button
            aria-label="Search Cases"
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-90"
            type="button"
            onClick={onOpenSearch}
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Wishlist */}
          <button
            aria-label="Wishlist"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-90"
            type="button"
            onClick={() => onSelectTab('home')}
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary-container ring-2 ring-surface animate-pulse" />
            )}
          </button>

          {/* Cart with Counter */}
          <button
            aria-label="Cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-90"
            type="button"
            onClick={() => onSelectTab('cart')}
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-primary text-on-primary text-[10px] font-bold font-sans flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar with Dropdown */}
          <div className="relative pl-1">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
              aria-label="Profile and Admin Menu"
              aria-expanded={showProfileMenu}
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary transition-all"
                src={USER_AVATAR}
              />
            </button>

            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-surface-container-lowest shadow-xl border border-surface-container-high py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-2 border-b border-surface-container-high">
                    <p className="text-xs font-bold text-on-surface">Rahul Sharma</p>
                    <p className="text-[11px] text-on-surface-variant truncate">rahul.s@example.com</p>
                  </div>

                  <div className="p-1.5">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab('account');
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-semibold rounded-xl hover:bg-surface-container flex items-center gap-2 text-on-surface"
                    >
                      <span className="material-symbols-outlined text-[18px] text-primary">person</span>
                      My Account & Orders
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onToggleAdmin();
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-semibold rounded-xl hover:bg-surface-container flex items-center justify-between text-on-surface"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-tertiary">terminal</span>
                        <span>Ops Console (Admin)</span>
                      </div>
                      {isAdmin && (
                        <span className="text-[10px] bg-tertiary-container text-on-tertiary px-1.5 py-0.5 rounded font-bold">
                          ACTIVE
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onToggleFramed();
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-semibold rounded-xl hover:bg-surface-container flex items-center justify-between text-on-surface"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-outline">devices</span>
                        <span>{isFramed ? 'Exit Phone Frame' : 'Preview Phone Frame'}</span>
                      </div>
                    </button>

                    <div className="my-1 border-t border-surface-container-high" />

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab('account');
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-medium rounded-xl hover:bg-error-container/20 text-error flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Log Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
