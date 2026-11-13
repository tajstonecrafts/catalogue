import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ShoppingBag, Phone, Menu, X, MessageCircle, Search, Sparkles, ArrowRight, Heart, Mail, Instagram } from 'lucide-react';
import { CONTACT_INFO, PRODUCTS } from '../data/products';
import { Product } from '../types';
import { MarbleIllustration } from './MarbleIllustration';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount?: number;
  onOpenWishlist?: () => void;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
  onNavigateSection: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  wishlistCount = 0,
  onOpenWishlist,
  currency,
  onToggleCurrency,
  onNavigateSection,
  searchQuery,
  onSearchChange,
  onSelectProduct
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  // Instant matching products for quick search preview dropdown
  const matchedProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchStone = p.stoneType.toLowerCase().includes(q);
      const matchInlay = p.inlayWork?.toLowerCase().includes(q) || false;
      const matchDesc = p.shortDesc.toLowerCase().includes(q);
      return matchName || matchCategory || matchStone || matchInlay || matchDesc;
    }).slice(0, 5); // top 5 quick previews
  }, [searchQuery]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearchFocused(false);
    handleNav('collections');
  };

  const handleQuickTagClick = (tag: string) => {
    onSearchChange(tag);
    setIsSearchFocused(true);
    searchInputRef.current?.focus();
  };

  const handleProductPick = (product: Product) => {
    onSelectProduct(product);
    setIsSearchFocused(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d121a]/95 backdrop-blur-md border-b border-[#232d3d] transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#131a26] text-xs text-[#b8c2d1] border-b border-[#1f2838] px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3 text-[#c5a059]" />
              <span>{CONTACT_INFO.email}</span>
            </a>
            <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#c5a059] transition-colors hidden sm:flex items-center gap-1.5"
            >
              <Instagram className="w-3 h-3 text-[#E1306C]" />
              <span>{CONTACT_INFO.instagramHandle}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-[#c5a059]" />
              <span>{CONTACT_INFO.phoneFormatted}</span>
            </a>
            <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#25D366] hover:underline hidden sm:flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <button
          onClick={() => handleNav('hero')}
          className="flex items-center gap-3.5 text-left focus:outline-none group shrink-0 cursor-pointer"
        >
          <div className="relative h-12 w-12 sm:h-13 sm:w-13 rounded-lg overflow-hidden border border-[#c5a059]/40 bg-[#0d121a] flex items-center justify-center shadow-lg group-hover:border-[#c5a059] group-hover:shadow-[#c5a059]/15 transition-all shrink-0">
            <img
              src="/assets/aistudio/Primary_logo__dark_2x_dd8eb1e6.png"
              alt="Taj Stone Crafts Emblem"
              className="w-full h-full object-cover object-[center_32%] scale-125 transition-transform duration-300 group-hover:scale-135"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg lg:text-xl tracking-[0.16em] text-white group-hover:text-[#d4af37] transition-colors leading-tight">
              TAJ STONE CRAFTS
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-[#c5a059] uppercase font-medium mt-0.5">
              Agra · Marble Handicrafts · Pietra Dura
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links + Integrated Header Search Bar */}
        <div className="flex-1 flex items-center justify-center max-w-2xl px-2">
          {/* Header Search Bar (Desktop / Tablet) */}
          <div ref={searchContainerRef} className="relative w-full max-w-md hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-[#8a99ad] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search coasters, trays, lamps, inlay, Makrana..."
                className="w-full bg-[#121926] border border-[#26354a] hover:border-[#384c66] focus:border-[#c5a059] rounded-full pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-[#78889b] focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8a99ad] hover:text-white"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Live Search Quick Results Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#101724] border border-[#26374e] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                {/* Popular / Quick Filter Suggestions */}
                <div className="p-3 bg-[#0d131d] border-b border-[#1c2838] flex items-center gap-1.5 flex-wrap text-[11px]">
                  <span className="text-[#8e9cae] font-medium mr-1">Quick Suggestions:</span>
                  {['Coasters', 'Inlay', 'Makrana', 'Lamps', 'Trays', 'Brass'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleQuickTagClick(tag)}
                      className="px-2 py-0.5 rounded bg-[#172232] hover:bg-[#c5a059] text-[#cbd5e1] hover:text-[#0d121a] transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Search Matches List */}
                <div className="max-h-72 overflow-y-auto divide-y divide-[#1b2636]">
                  {searchQuery.trim() && matchedProducts.length === 0 ? (
                    <div className="p-5 text-center text-xs text-[#8e9cae]">
                      No products found matching &ldquo;<span className="text-white">{searchQuery}</span>&rdquo;.
                      <p className="mt-1 text-[11px] text-[#64748b]">Try searching by material like &apos;Makrana&apos;, &apos;Lapis&apos;, or category like &apos;coasters&apos;.</p>
                    </div>
                  ) : matchedProducts.length > 0 ? (
                    matchedProducts.map((p) => {
                      return (
                        <div
                          key={p.id}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleProductPick(p)}
                          className="p-3 flex items-center gap-3 hover:bg-[#162130] cursor-pointer transition-colors group"
                        >
                          <div className="w-12 h-12 bg-[#090d14] rounded border border-[#222e40] overflow-hidden shrink-0 flex items-center justify-center">
                            {p.imageUrl ? (
                              <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <MarbleIllustration type={p.svgType} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block text-xs font-semibold text-white group-hover:text-[#c5a059] transition-colors truncate">
                              {p.name}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] text-[#8e9cae] mt-0.5">
                              <span className="capitalize">{p.category}</span>
                              <span aria-hidden="true">·</span>
                              <span className="truncate">{p.stoneType.split(' ')[0]} Stone</span>
                              {p.inlayWork && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="text-[#c5a059] truncate">Inlay</span>
                                </>
                              )}
                            </div>
                          </div>
                          <span className="text-[11px] font-semibold text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 px-2 py-0.5 rounded shrink-0">
                            Enquire
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-xs text-[#8e9cae]">
                      Type product name or material (e.g., &apos;coasters&apos;, &apos;inlay&apos;, &apos;Makrana&apos;) to see instant results.
                    </div>
                  )}
                </div>

                {/* View Full Catalog Results Link */}
                {searchQuery.trim() && (
                  <div className="p-2.5 bg-[#0e141f] border-t border-[#1c2838] text-center">
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSearchSubmit()}
                      className="text-xs text-[#c5a059] hover:underline font-semibold flex items-center justify-center gap-1.5 w-full"
                    >
                      <span>Show all matching items in catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Clean Navigation Links for Desktop (visible on large screens) */}
          <nav className="hidden xl:flex items-center gap-6 text-xs lg:text-sm font-medium text-[#c4ccd8] ml-4">
            <button
              onClick={() => handleNav('collections')}
              className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Collections
            </button>
            <button
              onClick={() => handleNav('personalized')}
              className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Custom Studio
            </button>
            <button
              onClick={() => handleNav('heritage')}
              className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Heritage
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Zone 3: Actions + Currency Switcher + Mobile Search Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile Search Button Toggle */}
          <button
            onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
            className="md:hidden p-2 text-[#9ca3af] hover:text-white rounded border border-[#26354a] bg-[#121924]"
            title="Toggle search"
            aria-label="Toggle search"
          >
            <Search className="w-4 h-4 text-[#c5a059]" />
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={onOpenWishlist || onOpenCart}
            className="relative p-2 text-[#cbd5e1] hover:text-[#ef4444] rounded border border-[#2b384a] bg-[#121924] hover:bg-[#192230] transition-colors whitespace-nowrap shrink-0 flex items-center justify-center cursor-pointer"
            title={`Saved Wishlist (${wishlistCount} items)`}
            aria-label="Open saved wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#ef4444] fill-current' : 'text-[#9ca3af]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-[10px] font-bold bg-[#ef4444] text-white rounded-full tabular-nums shadow">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Primary Action: Enquiry List */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-[#b38a3d] to-[#c5a059] hover:from-[#c5a059] hover:to-[#dfba6a] rounded transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            title="View Selected Pieces for Enquiry"
          >
            <MessageCircle className="w-4 h-4 text-[#0d121a] fill-current" />
            <span className="text-[#0d121a] font-bold hidden sm:inline">Enquiry List</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center text-xs font-bold bg-[#0d121a] text-[#f5d77f] rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#9ca3af] hover:text-white rounded focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Input Drawer (When toggled on mobile) */}
      {mobileSearchVisible && (
        <div className="md:hidden px-4 py-2.5 bg-[#0f1722] border-b border-[#232d3d] animate-in slide-in-from-top-2">
          <form
            onSubmit={(e) => {
              handleSearchSubmit(e);
              setMobileSearchVisible(false);
            }}
            className="relative flex items-center"
          >
            <Search className="w-4 h-4 text-[#8a99ad] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search coasters, inlay, marble..."
              className="w-full bg-[#141d2a] border border-[#28384d] rounded-full pl-9 pr-8 py-2 text-xs text-white placeholder-[#78889b] focus:outline-none focus:border-[#c5a059]"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8a99ad]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
          {/* Quick tags for mobile */}
          <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 text-[11px] scrollbar-none">
            <span className="text-[#64748b] text-[10px]">Popular:</span>
            {['Coasters', 'Inlay', 'Makrana', 'Lamps', 'Trays'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  onSearchChange(tag);
                  handleNav('collections');
                  setMobileSearchVisible(false);
                }}
                className="px-2 py-0.5 rounded bg-[#1c2738] text-[#cbd5e1] whitespace-nowrap"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0f1520] border-b border-[#232d3d] px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-4">
          <button
            onClick={() => handleNav('collections')}
            className="block w-full text-left py-2 text-sm text-[#e2e8f0] hover:text-[#d4af37]"
          >
            Collections & Artifacts
          </button>
          <button
            onClick={() => handleNav('personalized')}
            className="block w-full text-left py-2 text-sm text-[#e2e8f0] hover:text-[#d4af37]"
          >
            Personalized & Custom Monograms
          </button>
          <button
            onClick={() => handleNav('heritage')}
            className="block w-full text-left py-2 text-sm text-[#e2e8f0] hover:text-[#d4af37]"
          >
            Pietra Dura (Parchin Kari) Heritage
          </button>
          <button
            onClick={() => handleNav('care')}
            className="block w-full text-left py-2 text-sm text-[#e2e8f0] hover:text-[#d4af37]"
          >
            Natural Marble Care Guide
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="block w-full text-left py-2 text-sm text-[#e2e8f0] hover:text-[#d4af37]"
          >
            Contact & Workshop Location
          </button>
          <div className="pt-3 border-t border-[#1f2937] flex items-center justify-between text-xs text-[#9ca3af]">
            <span>Agra: 8077801032</span>
            <span>tajstonecrafts@gmail.com</span>
          </div>
        </div>
      )}
    </header>
  );
};
