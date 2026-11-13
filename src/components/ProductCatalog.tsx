import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../data/products';
import { MarbleIllustration } from './MarbleIllustration';
import { Search, Eye, Plus, Check, Sparkles, Heart, MessageCircle } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  currency: 'INR' | 'USD';
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  currency,
  onSelectProduct,
  onAddToCart,
  selectedCategory,
  onSelectCategory,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
  wishlistIds = [],
  onToggleWishlist
}) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = externalOnSearchChange !== undefined ? externalOnSearchChange : setInternalSearchQuery;

  const [stoneFilter, setStoneFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'name'>('featured');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const stoneTypes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.stoneType));
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Stone filter match
      if (stoneFilter !== 'all' && !p.stoneType.includes(stoneFilter)) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesDesc = p.shortDesc.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
        const matchesStone = p.stoneType.toLowerCase().includes(query);
        const matchesInlay = p.inlayWork?.toLowerCase().includes(query) || false;
        const matchesFeatures = p.features.some((f) => f.toLowerCase().includes(query));

        if (!matchesName && !matchesCategory && !matchesDesc && !matchesStone && !matchesInlay && !matchesFeatures) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0; // featured default
    });
  }, [products, selectedCategory, stoneFilter, searchQuery, sortBy]);

  const handleWhatsAppEnquiry = (product: Product) => {
    const text = encodeURIComponent(
      `Hello Taj Stone Crafts,\n` +
      `I would like to enquire about this piece:\n` +
      `Product: ${product.name} (${product.category})\n` +
      `Stone: ${product.stoneType}\n` +
      (product.inlayWork ? `Inlay: ${product.inlayWork}\n` : '') +
      `Please share pricing, lead time, and customization options.`
    );
    window.open(`https://wa.me/918077801032?text=${text}`, '_blank');
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="collections" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-[#c5a059] uppercase mb-2">
          <span>GALLERY-STYLE SHOWCASE</span>
          <span aria-hidden="true">·</span>
          <span>AUTHENTIC AGRA STONECRAFT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-tight">
          Curated Marble Creations
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#9ca3af]">
          Explore individual masterpieces chiseled from pristine Makrana marble, serpentinite, and Italian statuario, adorned with genuine Pietra Dura gemstone inlays.
        </p>
      </div>

      {/* Filter Tabs (Interactive Segmented Buttons) */}
      <div className="mb-8">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 scrollbar-none border-b border-[#1f2838]">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as Category)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#c5a059] text-[#0d121a] font-bold shadow-sm'
                    : 'text-[#9ca3af] hover:text-white hover:bg-[#151c27]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Bar: Search & Sub-Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coasters, trays, lamps, bowls, stone..."
            className="w-full bg-[#121824] border border-[#232f42] rounded pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#c5a059] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8] hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Stone and Sort Selectors */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={stoneFilter}
              onChange={(e) => setStoneFilter(e.target.value)}
              className="bg-[#121824] border border-[#232f42] rounded px-3 py-2 text-xs text-[#cbd5e1] focus:outline-none focus:border-[#c5a059]"
            >
              <option value="all">All Stone Types</option>
              {stoneTypes.map((stone) => (
                <option key={stone} value={stone}>
                  {stone.split(' ')[0]} {stone.split(' ')[1] || ''}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#121824] border border-[#232f42] rounded px-3 py-2 text-xs text-[#cbd5e1] focus:outline-none focus:border-[#c5a059]"
            >
              <option value="featured">Featured Curations</option>
              <option value="rating">Top Rated</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid (3-column desktop, 2-column tablet) */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[#232f42] rounded-lg">
          <p className="text-base text-[#94a3b8]">No marble crafts found matching your filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStoneFilter('all');
              onSelectCategory('all');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-[#c5a059] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative bg-[#111723] rounded-lg border border-[#1f2b3c] hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1 shadow-md hover:shadow-xl"
              >
                {/* Visual Area (65%-75% card height feel) */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0c1017]">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  ) : (
                    <MarbleIllustration type={product.svgType} isZoomed={false} />
                  )}

                  {/* Top Left Indicators */}
                  <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-10">
                    {product.badge && (
                      <div className="bg-[#0d121a]/90 backdrop-blur-md border border-[#2d3a4d] px-2.5 py-0.5 rounded text-[11px] font-medium text-[#c5a059]">
                        {product.badge}
                      </div>
                    )}
                    {product.isPersonalizable && (
                      <div className="bg-[#0d121a]/90 backdrop-blur-md border border-[#2d3a4d] px-2 py-0.5 rounded text-[10px] text-[#fef08a] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#facc15]" />
                        <span>Customizable</span>
                      </div>
                    )}
                  </div>

                  {/* Top Right: Wishlist Heart Toggle */}
                  {onToggleWishlist && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 border cursor-pointer ${
                        wishlistIds.includes(product.id)
                          ? 'bg-[#ef4444]/20 border-[#ef4444] text-[#ef4444] scale-105 shadow-lg'
                          : 'bg-[#0d121a]/80 border-[#2d3a4d] text-[#94a3b8] hover:text-[#ef4444] hover:border-[#ef4444]/50'
                      }`}
                      title={wishlistIds.includes(product.id) ? 'Saved in Wishlist' : 'Save to Wishlist'}
                      aria-label={wishlistIds.includes(product.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform ${
                          wishlistIds.includes(product.id) ? 'fill-current scale-110' : ''
                        }`}
                      />
                    </button>
                  )}

                  {/* Hover Overlay with Quick Actions */}
                  <div className="absolute inset-0 bg-[#0d121a]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="p-2.5 bg-[#17202d] text-white hover:text-[#c5a059] rounded-full border border-[#2d3c50] shadow-lg transition-transform hover:scale-110"
                      title="View Details & Story"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppEnquiry(product);
                      }}
                      className="p-2.5 rounded-full border shadow-lg transition-transform hover:scale-110 bg-[#c5a059] text-[#0d121a] hover:bg-[#dfba6a] border-[#c5a059]"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata (Zero-pill discipline) */}
                    <div className="flex items-center gap-2 text-xs text-[#94a3b8] mb-1.5">
                      <span className="uppercase tracking-wider font-semibold text-[#c5a059]">
                        {product.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{product.stoneType.split(' ')[0]} Stone</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">★ {product.rating}</span>
                    </div>

                    {/* Product Title */}
                    <h3 className="text-base font-semibold text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-1.5 text-xs text-[#94a3b8] line-clamp-2 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Enquiry CTA row (No prices shown) */}
                  <div className="mt-4 pt-3 border-t border-[#1a2332] flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[11px] text-[#c5a059] font-medium block truncate">
                        Solid Makrana Marble
                      </span>
                      <span className="text-[10px] text-[#8e9cae] block">
                        Custom sizes & engraving
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppEnquiry(product);
                      }}
                      className="px-3.5 py-2 text-xs font-semibold rounded bg-[#c5a059] text-[#0d121a] hover:bg-[#dfba6a] transition-all flex items-center gap-1.5 shadow active:scale-95 cursor-pointer shrink-0"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Enquire Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
