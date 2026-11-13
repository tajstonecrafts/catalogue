import React, { useState } from 'react';
import { Phone, Mail, Instagram, MessageCircle, MapPin, Clock, Send, Check, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/products';

export const Footer: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryMessage.trim()) return;

    const text = encodeURIComponent(
      `Hello Taj Stone Crafts,\n` +
      `New Website Inquiry:\n` +
      `Name: ${inquiryName}\n` +
      `Phone: ${inquiryPhone || 'Not provided'}\n` +
      `Message: "${inquiryMessage}"\n` +
      `Please get in touch with me!`
    );
    window.open(`https://wa.me/918077801032?text=${text}`, '_blank');
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 3000);
  };

  return (
    <footer id="contact" className="bg-[#090d13] border-t border-[#1a2332] text-[#9ca3af]">
      {/* Top Workshop Contact & Direct Inquiries Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="relative h-13 w-13 rounded-lg overflow-hidden border border-[#c5a059]/40 bg-[#0d121a] flex items-center justify-center shadow-lg shrink-0">
                <img
                  src="/assets/aistudio/Primary_logo__dark_2x_dd8eb1e6.png"
                  alt="Taj Stone Crafts Emblem"
                  className="w-full h-full object-cover object-[center_32%] scale-125"
                />
              </div>
              <div>
                <span className="block text-lg font-bold font-serif text-white tracking-[0.16em]">
                  TAJ STONE CRAFTS
                </span>
                <span className="block text-[10px] tracking-[0.22em] text-[#c5a059] uppercase font-medium">
                  Agra · Marble Handicrafts · Pietra Dura
                </span>
              </div>
            </div>

            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Purveyors of authentic Agra marble handicrafts and royal Mughal Pietra Dura gemstone inlays. Handcrafted with reverence for centuries-old Indian stonemasonry.
            </p>

            {/* Direct Contact Credentials */}
            <div className="space-y-3 pt-2 text-xs text-[#cbd5e1]">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-3 hover:text-[#c5a059] transition-colors"
              >
                <div className="w-8 h-8 rounded bg-[#131b26] flex items-center justify-center border border-[#232f42] shrink-0 text-[#c5a059]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-[#64748b]">Mobile & Call:</span>
                  <span className="font-semibold text-white">{CONTACT_INFO.phoneFormatted}</span>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 hover:text-[#c5a059] transition-colors"
              >
                <div className="w-8 h-8 rounded bg-[#131b26] flex items-center justify-center border border-[#232f42] shrink-0 text-[#c5a059]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-[#64748b]">Official Email:</span>
                  <span className="font-semibold text-white">{CONTACT_INFO.email}</span>
                </div>
              </a>

              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-[#e1306c] transition-colors"
              >
                <div className="w-8 h-8 rounded bg-[#131b26] flex items-center justify-center border border-[#232f42] shrink-0 text-[#e1306c]">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-[#64748b]">Instagram Profile:</span>
                  <span className="font-semibold text-white">@{CONTACT_INFO.instagramHandle}</span>
                </div>
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-[#25D366] transition-colors"
              >
                <div className="w-8 h-8 rounded bg-[#131b26] flex items-center justify-center border border-[#232f42] shrink-0 text-[#25D366]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-[#64748b]">WhatsApp Workshop:</span>
                  <span className="font-semibold text-[#25D366]">+91 80778 01032</span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: Workshop Location & Guarantee */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Artisan Workshop & Dispatch Center
            </h4>

            <div className="flex items-start gap-2.5 text-[#94a3b8]">
              <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Taj Ganj Crafts Enclave</strong>
                <span>Agra, Uttar Pradesh 282001, India (Near Taj Mahal East Gate)</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-[#94a3b8]">
              <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Artisan Working Hours</strong>
                <span>Monday – Sunday: 9:00 AM – 9:00 PM IST</span>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-[#111722] border border-[#1f2b3c] space-y-2">
              <div className="flex items-center gap-2 text-white font-medium">
                <ShieldCheck className="w-4 h-4 text-[#4ade80]" />
                <span>Zero-Breakage Guarantee</span>
              </div>
              <p className="text-[11px] text-[#9ca3af] leading-relaxed">
                All marble artifacts, lamps, and trays are shipped encased in multi-layer foam inside reinforced wooden crates. In the rare event of transit damage, we provide an immediate 100% free replacement.
              </p>
            </div>
          </div>

          {/* Column 3: Quick Direct Inquiry Form */}
          <div className="lg:col-span-4 bg-[#111723] p-5 sm:p-6 rounded-xl border border-[#233144]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-1">
              Custom Order or Bulk Quotation
            </h4>
            <p className="text-[11px] text-[#94a3b8] mb-4">
              Looking for bulk wedding favors, corporate gifting, or bespoke architectural marble plaques? Send us a direct message.
            </p>

            <form onSubmit={handleSubmitInquiry} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="Your Name *"
                  className="w-full bg-[#0d121a] border border-[#232f42] rounded px-3 py-2 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <input
                  type="tel"
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  placeholder="Your Phone / WhatsApp"
                  className="w-full bg-[#0d121a] border border-[#232f42] rounded px-3 py-2 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={3}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Tell us what you need (e.g. 50 monogrammed coaster sets for a wedding, custom dimensions)... *"
                  className="w-full bg-[#0d121a] border border-[#232f42] rounded px-3 py-2 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#c5a059] resize-none"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2.5 px-4 rounded text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  inquirySent
                    ? 'bg-[#15803d] text-white'
                    : 'bg-gradient-to-r from-[#b38a3d] to-[#c5a059] hover:from-[#c5a059] hover:to-[#dfba6a] text-[#0d121a]'
                }`}
              >
                {inquirySent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Inquiry Sent via WhatsApp!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry to Artisan (8077801032)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright & Contact Badges */}
        <div className="mt-12 pt-6 border-t border-[#18202d] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748b] gap-4">
          <p>
            © {new Date().getFullYear()} Taj Stone Crafts. All rights reserved. Agra, India.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span>Mobile: 8077801032</span>
            <span>·</span>
            <span>Email: tajstonecrafts@gmail.com</span>
            <span>·</span>
            <span>Instagram: @tajstonecrafts</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
