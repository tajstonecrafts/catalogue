import React from 'react';
import { ShieldCheck, Sparkles, Gem, Award, CheckCircle2 } from 'lucide-react';
import { MarbleIllustration } from './MarbleIllustration';

export const HeritageStory: React.FC = () => {
  return (
    <section id="heritage" className="py-20 bg-[#0d121a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#c5a059] uppercase mb-2">
            <Award className="w-4 h-4 text-[#c5a059]" />
            <span>MUGHAL HERITAGE OF AGRA</span>
            <span aria-hidden="true">·</span>
            <span>400-YEAR UNBROKEN GUILD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-tight leading-tight">
            The Living Art of Parchin Kari (Pietra Dura)
          </h2>
          <p className="mt-4 text-base text-[#9ca3af] leading-relaxed">
            When Emperor Shah Jahan commissioned the Taj Mahal in 1632, Italian lapidary artisans collaborated with Agra stonemasons to birth <em>Parchin Kari</em>—the technique of setting microscopic gemstone petals into impervious white marble. Today, Taj Stone Crafts works directly with hereditary descendant families in Taj Ganj, preserving this sublime craft for modern living.
          </p>
        </div>

        {/* 4-Step Craftsmanship Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-lg bg-[#111723] border border-[#1f2c3d] relative">
            <span className="text-2xl font-serif font-bold text-[#c5a059]/40 mb-3 block">01.</span>
            <h3 className="text-base font-semibold text-white mb-2">Makrana Quarrying</h3>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              Sourced exclusively from the Makrana quarries of Rajasthan—celebrated for 98% calcium carbonate purity and impervious translucent density.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#111723] border border-[#1f2c3d] relative">
            <span className="text-2xl font-serif font-bold text-[#c5a059]/40 mb-3 block">02.</span>
            <h3 className="text-base font-semibold text-white mb-2">Gemstone Slicing</h3>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              Lapis Lazuli, Malachite, and Mother of Pearl are hand-sliced into 1mm thin wafers and ground into curved flower petals using manual emery wheels.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#111723] border border-[#1f2c3d] relative">
            <span className="text-2xl font-serif font-bold text-[#c5a059]/40 mb-3 block">03.</span>
            <h3 className="text-base font-semibold text-white mb-2">Precision Chiseled Grooves</h3>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              With a delicate diamond-tipped chisel, the artisan excavates exact negative beds in the marble to match each microscopic gemstone petal.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#111723] border border-[#1f2c3d] relative">
            <span className="text-2xl font-serif font-bold text-[#c5a059]/40 mb-3 block">04.</span>
            <h3 className="text-base font-semibold text-white mb-2">Agate Stone Burnishing</h3>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              Glued with traditional organic resins and hand-buffed with water and natural agate stones until the gemstone inlays and marble unite as one flush surface.
            </p>
          </div>
        </div>

        {/* Marble Care & Longevity Guide Section */}
        <div id="care" className="bg-[#111723] border border-[#233145] rounded-xl p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c5a059]">
                LIFETIME HEIRLOOM PRESERVATION
              </span>
              <h3 className="text-2xl font-bold font-serif text-white">
                How to Care for Natural Marble Handicrafts
              </h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                Genuine marble is a gift of nature. Unlike synthetic ceramic or engineered resin copies, each piece breathes and possesses unique geological veining. Follow these artisan care rituals:
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-[#cbd5e1]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                  <span><strong>Gentle Cleaning:</strong> Wipe with a damp soft cotton cloth. For deep cleaning, use mild neutral pH dish soap with lukewarm water.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                  <span><strong>Protect from Citrus & Acids:</strong> Natural marble contains calcite which reacts to acidic liquids (lemon juice, vinegar, wine). Wipe spills immediately.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                  <span><strong>Occasional Nourishment:</strong> Buffing with a single drop of cold-pressed coconut oil or food-grade mineral wax restores silky luster.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                  <span><strong>Dishwasher Safety:</strong> Never place hand-inlaid Pietra Dura trays, coasters, or urns in automatic dishwashers.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 h-80 rounded-lg overflow-hidden border border-[#2b3a4f] bg-[#0a0e16] relative flex items-center justify-center group">
              <img
                src="/assets/aistudio/image-7_df37dded.jpeg"
                alt="Agra Hand-Carved Urli with Rose Petals & Floating Diyas"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-[#0d121a]/90 backdrop-blur-md border border-[#263548] p-3 rounded text-center">
                <span className="text-xs font-serif font-bold text-[#c5a059] block">Handcrafted in Agra, India</span>
                <span className="text-[11px] text-[#cbd5e1]">Solid Makrana marble sculpted with traditional scalloped petals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
