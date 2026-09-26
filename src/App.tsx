import { useState } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { ModelSelectorScreen } from './screens/ModelSelectorScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { AccountScreen } from './screens/AccountScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { OpsConsoleScreen } from './screens/OpsConsoleScreen';
import { ReturnExchangeModal } from './screens/ReturnExchangeModal';
import { LiveGpsModal } from './components/LiveGpsModal';
import { ImeiScanModal } from './components/ImeiScanModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeModel, setActiveModel] = useState<string>('iPhone 15 Pro');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // FrostShield MagSafe Case
      selectedColor: 'Space Black',
      selectedModel: 'iPhone 15 Pro',
      quantity: 1,
    },
    {
      product: PRODUCTS[4], // 9H Diamond Tempered Glass
      selectedColor: 'High Transparency Clear',
      selectedModel: 'iPhone 15 Pro',
      quantity: 1,
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    PRODUCTS[0].id,
    PRODUCTS[3].id,
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  // Modals
  const [isReturnExchangeOpen, setIsReturnExchangeOpen] = useState(false);
  const [isLiveGpsOpen, setIsLiveGpsOpen] = useState(false);
  const [isImeiScanOpen, setIsImeiScanOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFramed, setIsFramed] = useState(false);

  const showToast = (msg: string) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2600);
    setToastTimer(timer);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, color?: string) => {
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === chosenColor
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [
        ...prev,
        {
          product,
          selectedColor: chosenColor,
          selectedModel: activeModel,
          quantity: 1,
        },
      ];
    });
    showToast(`${product.name} added to bag!`);
  };

  const handleBuyNow = (product: Product, color?: string) => {
    handleAddToCart(product, color);
    setCurrentTab('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from bag');
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const handleApplyModel = (modelName: string) => {
    setActiveModel(modelName);
    showToast(`Active phone model set to ${modelName}`);
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (orderTotal: number, method: string) => {
    showToast(`Payment of ₹${orderTotal} confirmed via ${method}! Tracking created.`);
    setCartItems([]);
    setCurrentTab('account');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen bg-surface flex flex-col items-center selection:bg-primary/20 ${isFramed ? 'py-6 px-3 bg-surface-dim' : ''}`}>
      {/* Device framing container for desktop preview if enabled */}
      <div
        className={`w-full bg-surface transition-all flex flex-col min-h-screen ${
          isFramed
            ? 'max-w-[420px] rounded-[44px] shadow-2xl border-[10px] border-inverse-surface overflow-hidden relative'
            : 'max-w-md shadow-sm'
        }`}
      >
        {/* Dynamic Island / Speaker notch for framed view */}
        {isFramed && (
          <div className="w-full flex justify-center pt-2 bg-surface select-none z-50">
            <div className="w-24 h-4 bg-inverse-surface rounded-full flex items-center justify-end px-2">
              <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
            </div>
          </div>
        )}

        {/* Global Header */}
        <Header
          activeModel={activeModel}
          cartCount={cartTotalCount}
          wishlistCount={wishlistIds.length}
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenModelSelector={() => {
            setCurrentTab('models');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSearch={() => {
            setCurrentTab('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isAdmin={isAdmin}
          onToggleAdmin={() => {
            setIsAdmin(!isAdmin);
            setCurrentTab(isAdmin ? 'home' : 'ops-console');
            showToast(isAdmin ? 'Switched to Customer Store' : 'Switched to Warehouse Admin Console');
          }}
          isFramed={isFramed}
          onToggleFramed={() => setIsFramed(!isFramed)}
        />

        {/* Screen Routing */}
        <main className="flex-1 w-full relative">
          {currentTab === 'home' && (
            <HomeScreen
              activeModel={activeModel}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(p) => handleAddToCart(p)}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onChangeModel={() => setCurrentTab('models')}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'explore' && (
            <ExploreScreen
              activeModel={activeModel}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(p) => handleAddToCart(p)}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onChangeModel={() => setCurrentTab('models')}
            />
          )}

          {currentTab === 'models' && (
            <ModelSelectorScreen
              currentModel={activeModel}
              onApplyModel={handleApplyModel}
              onOpenImeiScan={() => setIsImeiScanOpen(true)}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'product-detail' && (
            <ProductDetailScreen
              product={selectedProduct}
              activeModel={activeModel}
              onBack={() => setCurrentTab('home')}
              onAddToCart={(p, color) => handleAddToCart(p, color)}
              onBuyNow={(p, color) => handleBuyNow(p, color)}
              isWishlisted={wishlistIds.includes(selectedProduct.id)}
              onToggleWishlist={handleToggleWishlist}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'cart' && (
            <CheckoutScreen
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onBack={() => setCurrentTab('home')}
              onOrderSuccess={handleOrderSuccess}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'account' && (
            <AccountScreen
              onOpenReturnExchange={() => setIsReturnExchangeOpen(true)}
              onOpenLiveGps={() => setIsLiveGpsOpen(true)}
              onOpenOpsConsole={() => {
                setIsAdmin(true);
                setCurrentTab('ops-console');
              }}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'ops-console' && (
            <OpsConsoleScreen
              onBackToStore={() => setCurrentTab('home')}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Global Bottom Navigation (Visible on main tabs) */}
        {['home', 'explore', 'models', 'cart', 'account'].includes(currentTab) && (
          <BottomNav
            currentTab={currentTab}
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            cartCount={cartTotalCount}
          />
        )}

        {/* Interactive Modals */}
        <ReturnExchangeModal
          isOpen={isReturnExchangeOpen}
          onClose={() => setIsReturnExchangeOpen(false)}
          onShowToast={showToast}
        />

        <LiveGpsModal
          isOpen={isLiveGpsOpen}
          onClose={() => setIsLiveGpsOpen(false)}
          awb="849204921"
        />

        <ImeiScanModal
          isOpen={isImeiScanOpen}
          onClose={() => setIsImeiScanOpen(false)}
          onSelectModel={handleApplyModel}
        />

        {/* Delight Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-20 left-4 right-4 z-50 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="bg-inverse-surface/95 text-inverse-on-surface text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-surface-container-high/40 flex items-center gap-2 max-w-sm">
              <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                check_circle
              </span>
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
