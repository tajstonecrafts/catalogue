import React, { useState } from 'react';
import { Product } from '../types';
import { Sparkles, Check, MessageSquare, Send } from 'lucide-react';
import { CONTACT_INFO } from '../data/products';

interface PersonalizationStudioProps {
  currency: 'INR' | 'USD';
  onAddToCart: (product: Product, quantity: number, note: string) => void;
}

const BASE_ITEMS = [
  { id: 'coasters', name: 'Hexagonal Coaster Set (6 Pcs)', basePriceINR: 2600, basePriceUSD: 34, svgType: 'coaster_hex' as const },
  { id: 'tray', name: 'Imperial Brass-Handle Marble Tray', basePriceINR: 4200, basePriceUSD: 54, svgType: 'tray_brass' as const },
  { id: 'desk', name: 'Executive Nameplate & Pen Stand', basePriceINR: 2800, basePriceUSD: 36, svgType: 'desk_organizer' as const },
  { id: 'board', name: 'Marble & Teak Serving Board', basePriceINR: 3400, basePriceUSD: 44, svgType: 'tray_brass' as const },
  { id: 'plate', name: '10-Inch Custom Inlay Commemorative Plate', basePriceINR: 7500, basePriceUSD: 96, svgType: 'inlay_plate' as const }
];

const STONES = [
  { id: 'makrana', name: 'Makrana Pure White Marble', color: '#f5f0e6', desc: 'The historic Taj Mahal stone, silky smooth' },
  { id: 'marquina', name: 'Black Marquina Marble', color: '#1c2430', desc: 'Midnight black with striking white calcite veins' },
  { id: 'rainforest', name: 'Rainforest Green Serpentinite', color: '#1b3a2b', desc: 'Deep earthy moss textures with tree-root veining' },
  { id: 'jaisalmer', name: 'Jaisalmer Golden Teakwood', color: '#bfa16a', desc: 'Warm desert golden sandstone with natural rings' }
];

const INLAYS = [
  { id: 'brass', name: 'Pure Brushed Brass Line Inlay', stoneDesc: 'Gleaming solid brass metal flush with marble' },
  { id: 'lapis', name: 'Royal Afghan Lapis Lazuli', stoneDesc: 'Vibrant celestial deep blue semi-precious stone' },
  { id: 'malachite', name: 'Vibrant Green Malachite', stoneDesc: 'Striking banded emerald green mineral' },
  { id: 'mop', name: 'Iridescent Mother of Pearl', stoneDesc: 'Pearly rainbow luminescence against marble' }
];

export const PersonalizationStudio: React.FC<PersonalizationStudioProps> = ({
  currency,
  onAddToCart
}) => {
  const [selectedItem, setSelectedItem] = useState(BASE_ITEMS[0]);
  const [selectedStone, setSelectedStone] = useState(STONES[0]);
  const [selectedInlay, setSelectedInlay] = useState(INLAYS[0]);
  const [engravingText, setEngravingText] = useState('THE AGARWAL FAMILY');
  const [fontStyle, setFontStyle] = useState<'serif' | 'classic' | 'modern'>('serif');
  const [submitted, setSubmitted] = useState(false);


  const handleOrderCustom = () => {
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: `Custom ${selectedItem.name} (${selectedStone.name})`,
      category: 'personalized',
      priceINR: selectedItem.basePriceINR,
      priceUSD: selectedItem.basePriceUSD,
      rating: 5.0,
      reviewsCount: 1,
      stoneType: selectedStone.name,
      inlayWork: selectedInlay.name,
      dimensions: 'Handmade to custom architectural dimensions',
      weight: 'Custom weight according to stone selection',
      shortDesc: `Custom chiseled with "${engravingText}". Inlaid with ${selectedInlay.name}.`,
      description: `Bespoke artisanal marble creation hand-chiseled in Agra. Customized with customer inscription "${engravingText}".`,
      features: [
        `Base Stone: ${selectedStone.name}`,
        `Inlay Stone/Metal: ${selectedInlay.name}`,
        `Custom Inscription: "${engravingText}"`,
        `Artisan proof validated before final chiseling`
      ],
      careInstructions: 'Clean with soft dry microfiber. Avoid acidic detergents.',
      isPersonalizable: true,
      inStock: true,
      svgType: selectedItem.svgType
    };

    onAddToCart(
      customProduct,
      1,
      `[Custom Studio] Inscription: "${engravingText}" | Stone: ${selectedStone.name} | Inlay: ${selectedInlay.name} | Style: ${fontStyle}`
    );

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Hello Taj Stone Crafts,\n` +
      `I am designing a custom piece on your website:\n` +
      `Item: ${selectedItem.name}\n` +
      `Base Stone: ${selectedStone.name}\n` +
      `Inlay: ${selectedInlay.name}\n` +
      `Custom Inscription: "${engravingText}"\n` +
      `Please provide price quote, digital drawing, and photos of raw stone slabs.`
    );
    window.open(`https://wa.me/918077801032?text=${text}`, '_blank');
  };

  return (
    <section id="personalized" className="py-16 bg-[#0b0f17] border-y border-[#1c2637]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-[#c5a059] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BESPOKE ARTISAN WORKSHOP</span>
            <span aria-hidden="true">·</span>
            <span>CUSTOM COMMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            Personalized Stonecraft Studio
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9ca3af]">
            Inscribe family names, wedding dates, corporate logos, or bespoke Mughal floral motifs directly into Makrana marble.
          </p>
        </div>

        {/* Studio Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Visual Mockup Preview */}
          <div className="lg:col-span-5 bg-[#101622] border border-[#233145] rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
            <div className="w-full flex items-center justify-between text-xs text-[#94a3b8] mb-4">
              <span className="font-semibold text-[#c5a059]">LIVE ARTISAN PREVIEW</span>
              <span className="tabular-nums">Agra Workshop #A-102</span>
            </div>

            {/* Mockup Canvas */}
            <div
              className="w-full aspect-[4/3] rounded-lg border border-[#2b3a4f] relative flex flex-col items-center justify-center p-6 shadow-inner transition-colors duration-300"
              style={{
                backgroundColor: selectedStone.color,
                color: selectedStone.id === 'marquina' ? '#f8fafc' : '#1e293b'
              }}
            >
              {/* Subtle stone texture lines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Decorative inlaid border */}
              <div
                className="w-[90%] h-[85%] border-2 rounded flex flex-col items-center justify-center p-4 transition-all"
                style={{
                  borderColor: selectedInlay.id === 'brass' ? '#c5a059' : selectedInlay.id === 'lapis' ? '#2563eb' : selectedInlay.id === 'malachite' ? '#16a34a' : '#d97706'
                }}
              >
                {/* Gemstone emblem */}
                <div className="w-6 h-6 rounded-full mb-3 flex items-center justify-center shadow-md border border-white/40"
                  style={{
                    backgroundColor: selectedInlay.id === 'brass' ? '#c5a059' : selectedInlay.id === 'lapis' ? '#1e40af' : selectedInlay.id === 'malachite' ? '#15803d' : '#fffbeb'
                  }}
                >
                  <span className="text-[10px] text-white font-bold">✦</span>
                </div>

                {/* Engraved text */}
                <p
                  className={`text-lg sm:text-xl font-bold tracking-widest text-center uppercase break-words max-w-[90%] ${
                    fontStyle === 'serif' ? 'font-serif' : fontStyle === 'classic' ? 'font-mono' : 'font-sans'
                  }`}
                  style={{
                    textShadow: selectedStone.id === 'marquina' ? '0 1px 2px rgba(255,255,255,0.2)' : '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  {engravingText || 'YOUR CUSTOM TEXT'}
                </p>

                <div className="mt-3 text-[10px] uppercase tracking-wider opacity-75">
                  Hand-Inlaid · {selectedInlay.name.split(' ')[0]}
                </div>
              </div>

              {/* Stone Badge Overlay */}
              <div className="absolute bottom-2 left-3 text-[10px] opacity-80 font-mono">
                {selectedStone.name}
              </div>
            </div>

            {/* Estimated Price summary replaced with Quotation on Request */}
            <div className="mt-6 w-full pt-4 border-t border-[#1e293b] flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs text-[#94a3b8] block">Custom Commission</span>
                <span className="text-base sm:text-lg font-bold font-serif text-[#c5a059]">Quotation on Request</span>
              </div>
              <span className="text-xs text-[#4ade80] bg-[#166534]/30 border border-[#22c55e]/30 px-2.5 py-1 rounded">
                Artisan Carved in 3 Days
              </span>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Choose Base Item */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-2">
                1. Select Artifact Silhouette
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BASE_ITEMS.map((item) => {
                  const isSelected = selectedItem.id === item.id;
                  const itemPrice = currency === 'INR' ? `₹${item.basePriceINR.toLocaleString('en-IN')}` : `$${item.basePriceUSD}`;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`p-3 rounded border text-left transition-all ${
                        isSelected
                          ? 'border-[#c5a059] bg-[#1a2332] text-white shadow-sm'
                          : 'border-[#222e40] bg-[#101622] text-[#9ca3af] hover:border-[#2d3e56]'
                      }`}
                    >
                      <span className="block text-xs font-semibold text-white">{item.name}</span>
                      <span className="text-[11px] text-[#c5a059] tabular-nums">{itemPrice}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Natural Marble Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-2">
                2. Select Natural Stone Base
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STONES.map((stone) => {
                  const isSelected = selectedStone.id === stone.id;
                  return (
                    <button
                      key={stone.id}
                      onClick={() => setSelectedStone(stone)}
                      className={`p-2.5 rounded border text-center transition-all ${
                        isSelected
                          ? 'border-[#c5a059] bg-[#1a2332]'
                          : 'border-[#222e40] bg-[#101622] hover:border-[#2d3e56]'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full mx-auto mb-1.5 border border-white/20"
                        style={{ backgroundColor: stone.color }}
                      />
                      <span className="block text-xs font-medium text-white truncate">{stone.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Choose Inlay Material */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-2">
                3. Select Inlay Stone / Metallic Accent
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {INLAYS.map((inlay) => {
                  const isSelected = selectedInlay.id === inlay.id;
                  return (
                    <button
                      key={inlay.id}
                      onClick={() => setSelectedInlay(inlay)}
                      className={`p-2.5 rounded border text-left transition-all ${
                        isSelected
                          ? 'border-[#c5a059] bg-[#1a2332]'
                          : 'border-[#222e40] bg-[#101622] hover:border-[#2d3e56]'
                      }`}
                    >
                      <span className="block text-xs font-medium text-white truncate">{inlay.name.split(' ')[0]}</span>
                      <span className="text-[10px] text-[#94a3b8] block truncate">{inlay.name.split(' ')[1] || ''}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Inscription Text & Font */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-2">
                4. Your Custom Inscription / Monogram (Max 35 Characters)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  maxLength={35}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                  placeholder="e.g. 'THE SHARMA RESIDENCE'"
                  className="flex-1 bg-[#121824] border border-[#232f42] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c5a059] tracking-wider"
                />
              </div>

              {/* Font style selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#94a3b8]">Typography:</span>
                {(['serif', 'classic', 'modern'] as const).map((font) => (
                  <button
                    key={font}
                    onClick={() => setFontStyle(font)}
                    className={`px-2.5 py-1 rounded text-xs capitalize ${
                      fontStyle === font
                        ? 'bg-[#c5a059] text-[#0d121a] font-bold'
                        : 'bg-[#151c28] text-[#9ca3af] hover:text-white'
                    }`}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleOrderCustom}
                className={`flex-1 py-3 px-5 rounded font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer ${
                  submitted
                    ? 'bg-[#15803d] text-white'
                    : 'bg-gradient-to-r from-[#b38a3d] to-[#c5a059] hover:from-[#c5a059] hover:to-[#dfba6a] text-[#0d121a]'
                }`}
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Enquiry List!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Save to Enquiry List</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppConsult}
                className="py-3 px-5 bg-[#0e221b] hover:bg-[#143329] border border-[#1b4332] text-[#25D366] hover:text-white font-medium text-xs sm:text-sm rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuss with Taj Stone Crafts Artisan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
