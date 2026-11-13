/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, Category, OrderDetails } from './types';
import { PRODUCTS, CONTACT_INFO } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { PersonalizationStudio } from './components/PersonalizationStudio';
import { HeritageStory } from './components/HeritageStory';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'cart' | 'wishlist'>('cart');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Wishlist state initialized with a couple of favorites or stored local preference
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('taj_stone_wishlist');
      return saved ? JSON.parse(saved) : ['coaster-02', 'lamp-01'];
    } catch {
      return ['coaster-02', 'lamp-01'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('taj_stone_wishlist', JSON.stringify(wishlist));
    } catch {
      // Local storage unavailable or quota exceeded
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, quantity = 1, personalizationNote?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.product.id === product.id && it.personalizationNote === personalizationNote
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, personalizationNote }];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" to your enquiry list.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from enquiry list.');
  };

  const handleToggleWishlist = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    const prodName = prod ? `"${prod.name}"` : 'Item';

    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`${prodName} removed from wishlist.`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`${prodName} saved to wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => prev.filter((id) => id !== productId));
    showToast(`${prod ? `"${prod.name}"` : 'Item'} removed from wishlist.`);
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, 1);
  };

  const handleOrderComplete = (_order: OrderDetails) => {
    setCart([]);
    showToast('Your order has been recorded successfully!');
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d121a] text-[#ede8df] flex flex-col selection:bg-[#c5a059]/30">
      {/* 3-Zone Top Navigation Bar with Integrated Search Bar & Wishlist */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => {
          setDrawerTab('cart');
          setIsCartOpen(true);
        }}
        onOpenWishlist={() => {
          setDrawerTab('wishlist');
          setIsCartOpen(true);
        }}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'INR' ? 'USD' : 'INR'))}
        onNavigateSection={handleNavigateSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Hero Showcase Section */}
      <Hero
        onExploreClick={() => handleNavigateSection('collections')}
        onCustomClick={() => handleNavigateSection('personalized')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Gallery-Style Showcase & Product Catalog */}
        <ProductCatalog
          products={PRODUCTS}
          currency={currency}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          wishlistIds={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* Bespoke / Personalized Stone Studio */}
        <PersonalizationStudio
          currency={currency}
          onAddToCart={handleAddToCart}
        />

        {/* Agra Heritage & Natural Marble Care Story */}
        <HeritageStory />
      </main>

      {/* Footer with Contact Details & Direct Inquiry Form */}
      <Footer />

      {/* Product Detail & Zoom Lightbox Modal */}
      <ProductModal
        product={selectedProduct}
        currency={currency}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        wishlistIds={wishlist}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Slide-out Cart & Wishlist Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        activeTab={drawerTab}
        onTabChange={setDrawerTab}
        wishlistIds={wishlist}
        allProducts={PRODUCTS}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveWishlistToCart}
      />

      {/* Secure Online Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        onOrderComplete={handleOrderComplete}
      />

      {/* Floating Action Button: Quick WhatsApp Connect to Agra Workshop */}
      <aside aria-label="Customer support" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          title="Direct WhatsApp with Agra Workshop"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-bold tracking-wide hidden sm:inline">
            WhatsApp: {CONTACT_INFO.phone}
          </span>
        </a>
      </aside>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#162130] border border-[#c5a059]/40 text-[#f3eedd] px-4 py-3 rounded-lg shadow-2xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3">
          <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
