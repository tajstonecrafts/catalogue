import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, MessageSquare, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../data/products';
import { MarbleIllustration } from './MarbleIllustration';

interface HeroProps {
  onExploreClick: () => void;
  onCustomClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCustomClick }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#0d121a] via-[#101722] to-[#0d121a] pt-12 pb-20 border-b border-[#1c2432]">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet kicker */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-[#c5a059] uppercase">
              <span>AGRA HERITAGE CRAFTSMANSHIP</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>ESTABLISHED IN THE HEART OF TAJ GANJ</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Timeless Marble Artifacts & Pietra Dura Inlay
            </h1>

            <p className="text-base sm:text-lg text-[#b8c2d1] leading-relaxed max-w-2xl">
              Sculpted from legendary Makrana white marble and embellished with lapis lazuli, malachite, and brushed brass. From heirloom dining trays and perforated jali lamps to bespoke corporate gifting and personalized keepsakes.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#b38a3d] to-[#c5a059] hover:from-[#c5a059] hover:to-[#dfba6a] text-[#0d121a] font-bold text-sm rounded shadow-lg hover:shadow-[#c5a059]/20 transition-all active:scale-98 cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCustomClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#141b26] hover:bg-[#1b2535] text-[#e2e8f0] hover:text-[#d4af37] border border-[#2b384a] font-medium text-sm rounded transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <span>Personalize & Engrave</span>
              </button>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-[#25D366] hover:text-white bg-[#0e221b] hover:bg-[#143329] border border-[#1b4332] text-sm font-medium rounded transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {CONTACT_INFO.phone}</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#1e2736] text-xs text-[#94a3b8]">
              <div>
                <span className="block text-white font-semibold text-sm">100% Makrana</span>
                <span>Direct quarry stone</span>
              </div>
              <div>
                <span className="block text-white font-semibold text-sm">Insured Wooden Crates</span>
                <span>Zero breakage guarantee</span>
              </div>
              <div>
                <span className="block text-white font-semibold text-sm">Custom Inlay & Names</span>
                <span>Master artisan carving</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-[#253245] shadow-2xl bg-[#111723]">
              {/* Featured Showcase Card */}
              <div className="h-96 sm:h-[440px] w-full relative overflow-hidden group">
                <img
                  src="/assets/aistudio/image-6_54e24352.jpeg"
                  alt="Royal Inlaid Pietra Dura Platter"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#0d121a]/85 backdrop-blur-md border border-[#2b394e] px-3.5 py-1.5 rounded text-xs shadow-md">
                  <span className="text-[#c5a059] font-serif font-bold">Parchin Kari</span>
                  <span className="text-slate-300"> · Royal Inlaid Tray with Brass Inlay Trim</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#0d121a]/90 backdrop-blur-md border border-[#2b394e] px-3.5 py-2 rounded text-right shadow-md">
                  <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Hand-inlaid gemstones</span>
                  <span className="text-sm font-bold text-white font-serif">Lapis Lazuli, Malachite & Jasper</span>
                </div>
              </div>
            </div>

            {/* Floating Mini Artifact badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#161f2e] border border-[#2c3b52] rounded-lg p-3.5 shadow-xl flex items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded bg-[#c5a059]/15 flex items-center justify-center shrink-0 border border-[#c5a059]/40">
                <ShieldCheck className="w-5 h-5 text-[#c5a059]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Direct Agra Workshop</p>
                <p className="text-[11px] text-[#9ca3af]">Support hereditary stone craftsmen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
