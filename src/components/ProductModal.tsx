import React, { useState } from 'react';
import { Product } from '../types';
import { MarbleIllustration } from './MarbleIllustration';
import { X, Check, ShieldCheck, Sparkles, MessageCircle, Phone, Truck, Share2, ZoomIn, ZoomOut, Heart, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  currency: 'INR' | 'USD';
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, personalizationNote?: string) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  wishlistIds = [],
  onToggleWishlist
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [personalizationText, setPersonalizationText] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care'>('details');
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, personalizationText.trim() ? personalizationText.trim() : undefined);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello Taj Stone Crafts,\n` +
      `I would like to enquire about:\n` +
      `Product: ${product.name} (${product.id})\n` +
      `Stone: ${product.stoneType}\n` +
      (product.inlayWork ? `Inlay Work: ${product.inlayWork}\n` : '') +
      `Quantity: ${quantity}\n` +
      (personalizationText ? `Personalization Request: "${personalizationText}"\n` : '') +
      `Please provide pricing quote, lead time, and customization options.`
    );
    window.open(`https://wa.me/918077801032?text=${text}`, '_blank');
  };

  const handleEmailEnquiry = () => {
    const subject = encodeURIComponent(`Product Enquiry: ${product.name} (Code: ${product.id})`);
    const body = encodeURIComponent(
      `Hello Taj Stone Crafts,\n\n` +
      `I am interested in acquiring this handcrafted marble piece:\n` +
      `Product: ${product.name}\n` +
      `Stone Type: ${product.stoneType}\n` +
      (product.inlayWork ? `Inlay Work: ${product.inlayWork}\n` : '') +
      `Quantity: ${quantity}\n` +
      (personalizationText ? `Personalization Request: "${personalizationText}"\n` : '') +
      `\nPlease send me pricing and dispatch details.\n\nThank you!`
    );
    window.location.href = `mailto:tajstonecrafts@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#101622] border border-[#26354a] rounded-xl shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#17202d]/80 text-[#9ca3af] hover:text-white rounded-full transition-colors border border-[#2b3a4f]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Gallery / Visual Showcase */}
        <div className="md:w-1/2 p-6 bg-[#0a0e16] flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#1f2c3d]">
          <div className="relative w-full aspect-square max-h-[380px] rounded-lg overflow-hidden border border-[#232f42] flex items-center justify-center bg-[#0c1017]">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 select-none ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            ) : (
              <MarbleIllustration type={product.svgType} isZoomed={isZoomed} />
            )}

            {/* Zoom toggle button */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-3 right-3 p-2 bg-[#0e141e]/90 text-[#c5a059] border border-[#2b394d] rounded-md hover:bg-[#182333] transition-colors"
              title={isZoomed ? 'Zoom Out' : 'Zoom In'}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>

            {/* Corner Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3 bg-[#0d121a]/90 border border-[#2b394d] text-[#c5a059] text-xs font-semibold px-2.5 py-1 rounded">
                {product.badge}
              </div>
            )}
          </div>

          {/* Quick Features Row */}
          <div className="w-full mt-4 grid grid-cols-2 gap-2 text-[11px] text-[#9ca3af]">
            <div className="p-2 rounded bg-[#121924] border border-[#1d2737]">
              <span className="block text-white font-medium">Stone Origin</span>
              <span>{product.stoneType}</span>
            </div>
            <div className="p-2 rounded bg-[#121924] border border-[#1d2737]">
              <span className="block text-white font-medium">Insured Packaging</span>
              <span>Reinforced Hard Crate</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module & Story */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Header info & actions */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold truncate">
                {product.category} · AGRA CRAFT
              </span>
              <div className="flex items-center gap-2 shrink-0">
                {onToggleWishlist && (
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`text-xs flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                      wishlistIds.includes(product.id)
                        ? 'bg-[#ef4444]/20 border-[#ef4444] text-[#ef4444]'
                        : 'bg-[#141b27] border-[#253245] text-[#9ca3af] hover:text-[#ef4444] hover:border-[#ef4444]/40'
                    }`}
                    title={wishlistIds.includes(product.id) ? 'Saved in Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${wishlistIds.includes(product.id) ? 'fill-current' : ''}`} />
                    <span>{wishlistIds.includes(product.id) ? 'Saved' : 'Wishlist'}</span>
                  </button>
                )}
                <button
                  onClick={handleShare}
                  className="text-xs text-[#94a3b8] hover:text-white flex items-center gap-1 px-2 py-1 rounded border border-[#253245] bg-[#141b27]"
                  title="Copy share link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-bold font-serif text-white tracking-tight">
              {product.name}
            </h2>

            {/* Rating and Reviews */}
            <div className="mt-2 flex items-center gap-2 text-xs text-[#94a3b8]">
              <span className="text-[#facc15] font-semibold">★ {product.rating}</span>
              <span aria-hidden="true">·</span>
              <span>{product.reviewsCount} Artisan Reviews</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#4ade80] font-medium">In Stock (Dispatches in 24h)</span>
            </div>

            {/* Price on Request status */}
            <div className="mt-4 flex items-center justify-between p-3.5 rounded-lg bg-[#141d2a] border border-[#223145]">
              <div>
                <span className="text-[11px] font-semibold text-[#c5a059] uppercase tracking-wider block">
                  Artisan Handcrafted Piece
                </span>
                <span className="text-sm font-bold text-white font-serif">
                  Price on Request · Custom Made to Order
                </span>
              </div>
              <span className="text-xs text-[#cbd5e1] bg-[#0d121a] border border-[#2b394d] px-2.5 py-1 rounded">
                Direct Agra Workshop
              </span>
            </div>

            {/* Tabs for specs */}
            <div className="mt-6 border-b border-[#232f42] flex gap-4 text-xs font-medium">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-[#c5a059] text-[#c5a059]'
                    : 'border-transparent text-[#94a3b8] hover:text-white'
                }`}
              >
                Artisan Story
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'specs'
                    ? 'border-[#c5a059] text-[#c5a059]'
                    : 'border-transparent text-[#94a3b8] hover:text-white'
                }`}
              >
                Specs & Weight
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'care'
                    ? 'border-[#c5a059] text-[#c5a059]'
                    : 'border-transparent text-[#94a3b8] hover:text-white'
                }`}
              >
                Stone Care
              </button>
            </div>

            {/* Tab content */}
            <div className="py-4 text-xs text-[#cbd5e1] leading-relaxed min-h-[110px]">
              {activeTab === 'details' && (
                <div>
                  <p>{product.description}</p>
                  <ul className="mt-3 space-y-1.5 text-[#94a3b8]">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#c5a059]">✦</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-[#1b2533]">
                    <span className="text-[#94a3b8]">Dimensions:</span>
                    <span className="font-medium text-white">{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1b2533]">
                    <span className="text-[#94a3b8]">Net Weight:</span>
                    <span className="font-medium text-white">{product.weight}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1b2533]">
                    <span className="text-[#94a3b8]">Base Stone:</span>
                    <span className="font-medium text-white">{product.stoneType}</span>
                  </div>
                  {product.inlayWork && (
                    <div className="flex justify-between py-1 border-b border-[#1b2533]">
                      <span className="text-[#94a3b8]">Inlay Craft:</span>
                      <span className="font-medium text-white">{product.inlayWork}</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'care' && (
                <div>
                  <p className="font-medium text-[#c5a059] mb-1">Authentic Natural Marble Maintenance:</p>
                  <p className="text-[#94a3b8]">{product.careInstructions}</p>
                  <p className="mt-2 text-[#94a3b8]">
                    Natural marble is porous. Never expose to harsh toilet acids or lime juice. Polish lightly with a microfiber cloth once every few months.
                  </p>
                </div>
              )}
            </div>

            {/* Custom Personalization Input (if customizable) */}
            {product.isPersonalizable && (
              <div className="my-4 p-3 bg-[#131b26] border border-[#2b3a4f] rounded-lg">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#facc15] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personalize This Item (Optional & Complimentary):</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] mb-2">
                  {product.personalizationType || 'Enter initials, couple names, or house crest to chisel.'}
                </p>
                <input
                  type="text"
                  maxLength={40}
                  value={personalizationText}
                  onChange={(e) => setPersonalizationText(e.target.value)}
                  placeholder="e.g. 'A & K · 2026' or 'Sharma House'"
                  className="w-full bg-[#0d121a] border border-[#26354a] rounded px-3 py-1.5 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-[#1f2c3d] space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Primary: Enquire Now on WhatsApp */}
              <button
                onClick={handleWhatsAppEnquiry}
                className="flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold bg-[#c5a059] hover:bg-[#dfba6a] text-[#0d121a] flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enquire Now on WhatsApp</span>
              </button>

              {/* Secondary: Email Enquiry */}
              <button
                onClick={handleEmailEnquiry}
                className="py-3 px-4 bg-[#141d2a] hover:bg-[#1a2535] border border-[#2b3a4f] text-white hover:text-[#c5a059] text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#c5a059]" />
                <span>Email Enquiry</span>
              </button>

              {/* Tertiary: Call direct */}
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="py-3 px-3.5 bg-[#141d2a] hover:bg-[#1a2535] border border-[#2b3a4f] text-[#cbd5e1] hover:text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                title="Call Workshop Directly"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Call {CONTACT_INFO.phone}</span>
              </a>
            </div>

            {/* Quick action to add to multiple item enquiry list */}
            <div className="flex items-center justify-between text-xs text-[#9ca3af] pt-1">
              <button
                onClick={handleAdd}
                className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Check className={`w-3.5 h-3.5 ${isAdded ? 'text-[#4ade80]' : 'text-[#c5a059]'}`} />
                <span>{isAdded ? 'Added to Enquiry List' : 'Save to Multi-Item Enquiry List'}</span>
              </button>
              <span>Dispatched with Zero Breakage Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
