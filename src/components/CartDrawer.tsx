import React from 'react';
import { CartItem, Product } from '../types';
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles, MessageCircle, ShoppingBag, Heart, Plus, Mail } from 'lucide-react';
import { MarbleIllustration } from './MarbleIllustration';
import { CONTACT_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'INR' | 'USD';
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  // Wishlist props
  activeTab: 'cart' | 'wishlist';
  onTabChange: (tab: 'cart' | 'wishlist') => void;
  wishlistIds: string[];
  allProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  activeTab,
  onTabChange,
  wishlistIds,
  allProducts,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  const handleWhatsAppInstantCheckout = () => {
    let orderText = `Hello Taj Stone Crafts, I would like to enquire about these handcrafted pieces:\n\n`;
    items.forEach((item, idx) => {
      orderText += `${idx + 1}. ${item.product.name} (Qty: ${item.quantity})\n   Stone: ${item.product.stoneType}\n`;
      if (item.personalizationNote) {
        orderText += `   Custom Inscription: "${item.personalizationNote}"\n`;
      }
    });
    orderText += `\nPlease provide price quotation, customization options, and delivery timeline.`;
    window.open(`https://wa.me/918077801032?text=${encodeURIComponent(orderText)}`, '_blank');
  };

  const handleEmailEnquiryAll = () => {
    let body = `Hello Taj Stone Crafts,\n\nI would like to receive pricing and availability for the following items:\n\n`;
    items.forEach((item, idx) => {
      body += `${idx + 1}. ${item.product.name} (Qty: ${item.quantity})\n   Stone: ${item.product.stoneType}\n`;
      if (item.personalizationNote) {
        body += `   Custom Inscription: "${item.personalizationNote}"\n`;
      }
    });
    body += `\nPlease send me a detailed quotation.\n\nThank you!`;
    window.location.href = `mailto:tajstonecrafts@gmail.com?subject=${encodeURIComponent('Product Enquiry - Taj Stone Crafts')}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsAppWishlistInquiry = () => {
    let text = `Hello Taj Stone Crafts, I am interested in these items saved in my wishlist:\n\n`;
    wishlistedProducts.forEach((p, idx) => {
      text += `${idx + 1}. ${p.name} (${p.stoneType})\n`;
    });
    text += `\nPlease let me know about pricing, current stock, and custom engraving options!`;
    window.open(`https://wa.me/918077801032?text=${encodeURIComponent(text)}`, '_blank');
  };

  const totalCartCount = items.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101622] border-l border-[#222f42] shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
          {/* Header with Segmented Tabs: Bag vs Wishlist */}
          <div className="p-4 border-b border-[#1f2b3d] bg-[#0c1017]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wider text-[#c5a059] uppercase">
                Taj Stone Crafts Agra
              </span>
              <button
                onClick={onClose}
                className="p-1.5 text-[#9ca3af] hover:text-white rounded-md hover:bg-[#192333] transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Segmented View Switcher */}
            <div className="grid grid-cols-2 p-1 bg-[#131b26] rounded-lg border border-[#222f42]">
              <button
                type="button"
                onClick={() => onTabChange('cart')}
                className={`py-2 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'cart'
                    ? 'bg-[#c5a059] text-[#0d121a] shadow-sm'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Enquiry List ({totalCartCount})</span>
              </button>

              <button
                type="button"
                onClick={() => onTabChange('wishlist')}
                className={`py-2 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'wishlist'
                    ? 'bg-[#ef4444] text-white shadow-sm'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${activeTab === 'wishlist' ? 'fill-current' : ''}`} />
                <span>Wishlist ({wishlistIds.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: ENQUIRY LIST VIEW */}
          {activeTab === 'cart' && (
            <>
              {/* Insured Delivery Banner */}
              <div className="bg-[#141d2a] px-5 py-2.5 border-b border-[#1f2c3e] flex items-center gap-2 text-xs text-[#94a3b8]">
                <ShieldCheck className="w-4 h-4 text-[#4ade80] shrink-0" />
                <span>Direct Artisan Workshop in Agra · Zero Breakage Safe Crating</span>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <ShoppingBag className="w-12 h-12 text-[#2b3a4f] mx-auto" />
                    <p className="text-sm text-[#94a3b8]">Your enquiry list is currently empty.</p>
                    {wishlistIds.length > 0 ? (
                      <button
                        onClick={() => onTabChange('wishlist')}
                        className="px-4 py-2 text-xs font-semibold text-[#ef4444] bg-[#221517] hover:bg-[#2e1c1f] border border-[#4a2228] rounded transition-colors inline-flex items-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>View Saved Wishlist ({wishlistIds.length} items)</span>
                      </button>
                    ) : (
                      <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-semibold text-[#c5a059] bg-[#16202e] hover:bg-[#1d2a3d] border border-[#2b3a4f] rounded transition-colors"
                      >
                        Explore Marble Collections
                      </button>
                    )}
                  </div>
                ) : (
                  items.map((item) => {
                    return (
                      <div
                        key={item.product.id}
                        className="p-3 bg-[#131b26] border border-[#1f2a3a] rounded-lg flex gap-3 relative"
                      >
                        {/* Visual miniature */}
                        <div className="w-20 h-20 bg-[#0a0e16] rounded border border-[#222e40] overflow-hidden shrink-0 flex items-center justify-center">
                          {item.product.imageUrl ? (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <MarbleIllustration type={item.product.svgType} />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-xs font-semibold text-white leading-tight truncate">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-[#64748b] hover:text-[#f87171] p-0.5"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[10px] text-[#9ca3af] block mt-0.5">
                              {item.product.stoneType.split(' ')[0]} Stone
                            </span>

                            {item.personalizationNote && (
                              <div className="mt-1 flex items-center gap-1 text-[10px] text-[#facc15] bg-[#1a2212] px-1.5 py-0.5 rounded border border-[#3f3b14]">
                                <Sparkles className="w-3 h-3 shrink-0" />
                                <span className="truncate">{item.personalizationNote}</span>
                              </div>
                            )}
                          </div>

                          {/* Quantity stepper & enquiry status */}
                          <div className="flex items-center justify-between pt-2 border-t border-[#1b2535]">
                            <div className="flex items-center border border-[#263548] rounded bg-[#0d121a]">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="px-2 py-0.5 text-xs text-[#94a3b8] hover:text-white"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-semibold text-white tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="px-2 py-0.5 text-xs text-[#94a3b8] hover:text-white"
                              >
                                +
                              </button>
                            </div>

                            <span className="text-[11px] font-semibold text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 px-2 py-0.5 rounded">
                              Price on Request
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer & Enquiry Actions */}
              {items.length > 0 && (
                <div className="p-5 border-t border-[#1f2b3d] bg-[#0c111a] space-y-3">
                  <div className="p-3 bg-[#131b27] border border-[#233144] rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-[#c5a059] font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>Direct Workshop Quote</span>
                    </div>
                    <p className="text-[11px] text-[#94a3b8] mt-1 leading-relaxed">
                      Connect directly with our master craftsmen in Agra to receive exact pricing, custom dimensions, and dispatch schedules.
                    </p>
                  </div>

                  {/* Primary WhatsApp Enquiry */}
                  <button
                    onClick={handleWhatsAppInstantCheckout}
                    className="w-full py-3 px-4 bg-[#c5a059] hover:bg-[#dfba6a] text-[#0d121a] font-bold text-sm rounded shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Enquire on WhatsApp ({items.length} Items)</span>
                  </button>

                  {/* Email Enquiry */}
                  <button
                    onClick={handleEmailEnquiryAll}
                    className="w-full py-2.5 px-4 bg-[#141d2a] hover:bg-[#1a2535] border border-[#2b3a4f] text-white hover:text-[#c5a059] font-semibold text-xs rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#c5a059]" />
                    <span>Send Email Enquiry ({CONTACT_INFO.email})</span>
                  </button>

                  <p className="text-[10px] text-center text-[#64748b]">
                    Workshop Helpline: {CONTACT_INFO.phoneFormatted}
                  </p>
                </div>
              )}
            </>
          )}

          {/* TAB 2: WISHLIST VIEW */}
          {activeTab === 'wishlist' && (
            <>
              {/* Wishlist Header Banner */}
              <div className="bg-[#181a24] px-5 py-2.5 border-b border-[#242636] flex items-center justify-between text-xs text-[#b8b0c8]">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#ef4444] fill-current" />
                  <span>Items saved for later consideration</span>
                </div>
                <span className="font-semibold text-white tabular-nums">{wishlistedProducts.length} items</span>
              </div>

              {/* Wishlist Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {wishlistedProducts.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <Heart className="w-12 h-12 text-[#34242c] mx-auto" />
                    <p className="text-sm text-[#9ca3af]">Your wishlist is currently empty.</p>
                    <p className="text-xs text-[#64748b] max-w-xs mx-auto">
                      Click the heart icon on any product in the catalog to save it to your wishlist.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-semibold text-[#c5a059] bg-[#16202e] hover:bg-[#1d2a3d] border border-[#2b3a4f] rounded transition-colors inline-block mt-2"
                    >
                      Browse Handicrafts Catalog
                    </button>
                  </div>
                ) : (
                  wishlistedProducts.map((product) => {
                    return (
                      <div
                        key={product.id}
                        className="p-3 bg-[#131b26] border border-[#1f2a3a] rounded-lg flex gap-3 relative group"
                      >
                        {/* Visual miniature */}
                        <div className="w-20 h-20 bg-[#0a0e16] rounded border border-[#222e40] overflow-hidden shrink-0 flex items-center justify-center">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <MarbleIllustration type={product.svgType} />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-xs font-semibold text-white leading-tight truncate">
                                {product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveFromWishlist(product.id)}
                                className="text-[#64748b] hover:text-[#ef4444] p-0.5 transition-colors"
                                title="Remove from wishlist"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[10px] text-[#9ca3af] block mt-0.5">
                              {product.stoneType.split(' ')[0]} Stone · {product.category}
                            </span>
                          </div>

                          {/* Enquiry Action */}
                          <div className="flex items-center justify-between pt-2 border-t border-[#1b2535]">
                            <span className="text-[11px] font-semibold text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 px-2 py-0.5 rounded">
                              Price on Request
                            </span>

                            <button
                              type="button"
                              onClick={() => onMoveToCart(product)}
                              className="px-3 py-1 bg-[#1a2535] hover:bg-[#c5a059] text-[#c5a059] hover:text-[#0d121a] border border-[#2d3f56] rounded text-xs font-semibold transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Enquiry List</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Wishlist Footer */}
              {wishlistedProducts.length > 0 && (
                <div className="p-5 border-t border-[#1f2b3d] bg-[#0c111a] space-y-3">
                  <button
                    onClick={handleWhatsAppWishlistInquiry}
                    className="w-full py-2.5 px-4 bg-[#0d281e] hover:bg-[#13382b] border border-[#1b4d3a] text-[#25D366] hover:text-white font-semibold text-xs rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire Saved Items via WhatsApp ({CONTACT_INFO.phone})</span>
                  </button>

                  <button
                    onClick={() => {
                      wishlistedProducts.forEach((p) => onMoveToCart(p));
                      onTabChange('cart');
                    }}
                    className="w-full py-2.5 px-4 bg-[#172233] hover:bg-[#1f2d42] border border-[#2b3a4f] text-white font-semibold text-xs rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#c5a059]" />
                    <span>Move All ({wishlistedProducts.length}) to Shopping Bag</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
