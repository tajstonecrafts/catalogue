import React from 'react';
import { Product } from '../types';

interface MarbleIllustrationProps {
  type: Product['svgType'];
  className?: string;
  isZoomed?: boolean;
}

export const MarbleIllustration: React.FC<MarbleIllustrationProps> = ({
  type,
  className = 'w-full h-full',
  isZoomed = false
}) => {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-transform duration-500 ${
        isZoomed ? 'scale-110' : 'scale-100'
      } ${className}`}
      style={{
        background: 'radial-gradient(circle at 50% 40%, #1a222f 0%, #101621 70%, #0a0e16 100%)'
      }}
    >
      {/* Stone grain overlay filter */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <filter id="marbleGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#marbleGrain)" />
      </svg>

      {/* Render product-specific handcrafted illustration */}
      {type === 'coaster_hex' && (
        <svg viewBox="0 0 300 240" className="w-[85%] h-[85%] drop-shadow-2xl">
          <defs>
            <linearGradient id="marbleWhite" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f7f4ee" />
              <stop offset="70%" stopColor="#eee8dc" />
              <stop offset="100%" stopColor="#e3dccd" />
            </linearGradient>
            <linearGradient id="brassGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3d789" />
              <stop offset="50%" stopColor="#c5a059" />
              <stop offset="100%" stopColor="#8a692b" />
            </linearGradient>
            <linearGradient id="lapisBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c5aa0" />
              <stop offset="100%" stopColor="#14305c" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Cast Shadow */}
          <polygon
            points="150,30 240,82 240,186 150,238 60,186 60,82"
            fill="#05080e"
            opacity="0.6"
            transform="translate(8, 14)"
          />

          {/* Marble Hexagon Body */}
          <polygon
            points="150,25 240,77 240,181 150,233 60,181 60,77"
            fill="url(#marbleWhite)"
            stroke="#dcd2bf"
            strokeWidth="1.5"
            filter="url(#softShadow)"
          />

          {/* Marble Veining lines */}
          <path
            d="M 85,90 Q 120,120 135,160 T 190,195"
            stroke="#c8bead"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 170,60 Q 155,95 190,135 T 220,165"
            stroke="#b8ac9b"
            strokeWidth="0.8"
            fill="none"
            opacity="0.45"
          />

          {/* Concentric Brass Inlay Lines */}
          <polygon
            points="150,42 225,85 225,173 150,216 75,173 75,85"
            fill="none"
            stroke="url(#brassGold)"
            strokeWidth="2.5"
          />

          {/* Center Pietra Dura Motif: Lapis & Malachite Floret */}
          <circle cx="150" cy="129" r="7" fill="url(#brassGold)" />
          {/* Petals */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="150"
              cy="114"
              rx="4"
              ry="9"
              fill={deg % 120 === 0 ? 'url(#lapisBlue)' : '#1e754a'}
              stroke="#0b1728"
              strokeWidth="0.4"
              transform={`rotate(${deg} 150 129)`}
            />
          ))}
          {/* Outer Inlay Dots */}
          {[30, 90, 150, 210, 270, 330].map((deg) => (
            <circle
              key={deg}
              cx="150"
              cy="98"
              r="2"
              fill="url(#brassGold)"
              transform={`rotate(${deg} 150 129)`}
            />
          ))}
        </svg>
      )}

      {type === 'tray_brass' && (
        <svg viewBox="0 0 320 220" className="w-[88%] h-[88%] drop-shadow-2xl">
          <defs>
            <linearGradient id="trayMarble" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f5f1e8" />
              <stop offset="100%" stopColor="#e4dccd" />
            </linearGradient>
            <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a37c35" />
              <stop offset="50%" stopColor="#f3d789" />
              <stop offset="100%" stopColor="#8a692b" />
            </linearGradient>
          </defs>

          {/* Deep Shadow */}
          <rect x="30" y="55" width="260" height="130" rx="14" fill="#06090e" opacity="0.7" />

          {/* Solid Marble Slab */}
          <rect
            x="24"
            y="46"
            width="272"
            height="136"
            rx="12"
            fill="url(#trayMarble)"
            stroke="#d4c8b2"
            strokeWidth="1.5"
          />

          {/* Inner Inset Lip / Basin */}
          <rect
            x="36"
            y="58"
            width="248"
            height="112"
            rx="8"
            fill="#f7f3eb"
            stroke="#c8bc9e"
            strokeWidth="1"
          />

          {/* Subtle marble veins across the tray face */}
          <path
            d="M 45,70 Q 110,85 160,135 T 260,140"
            stroke="#beb29f"
            strokeWidth="1.2"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M 90,160 Q 170,120 220,70"
            stroke="#cfc3af"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />

          {/* Brass Handles (Left and Right) */}
          {/* Left Handle */}
          <path
            d="M 16,84 C 6,84 6,144 16,144 L 26,140 C 20,135 20,95 26,88 Z"
            fill="url(#brassGrad)"
            stroke="#5e4414"
            strokeWidth="0.8"
          />
          <circle cx="26" cy="88" r="3.5" fill="#f3d789" stroke="#5e4414" strokeWidth="0.8" />
          <circle cx="26" cy="140" r="3.5" fill="#f3d789" stroke="#5e4414" strokeWidth="0.8" />

          {/* Right Handle */}
          <path
            d="M 304,84 C 314,84 314,144 304,144 L 294,140 C 300,135 300,95 294,88 Z"
            fill="url(#brassGrad)"
            stroke="#5e4414"
            strokeWidth="0.8"
          />
          <circle cx="294" cy="88" r="3.5" fill="#f3d789" stroke="#5e4414" strokeWidth="0.8" />
          <circle cx="294" cy="140" r="3.5" fill="#f3d789" stroke="#5e4414" strokeWidth="0.8" />

          {/* Royal Mughal Crest Inlay in Center */}
          <g transform="translate(160, 114)">
            <ellipse rx="22" ry="12" fill="none" stroke="url(#brassGrad)" strokeWidth="1.5" />
            <path
              d="M -12,0 Q 0,-8 12,0 Q 0,8 -12,0"
              fill="#196f3d"
              stroke="#0f3d22"
              strokeWidth="0.5"
            />
            <circle cx="0" cy="0" r="3" fill="#2c5aa0" />
            <circle cx="-16" cy="0" r="2" fill="url(#brassGrad)" />
            <circle cx="16" cy="0" r="2" fill="url(#brassGrad)" />
          </g>
        </svg>
      )}

      {type === 'bowl_lotus' && (
        <svg viewBox="0 0 300 240" className="w-[85%] h-[85%] drop-shadow-2xl">
          <defs>
            <radialGradient id="bowlRadial" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f0e9dc" />
              <stop offset="100%" stopColor="#d3c7b2" />
            </radialGradient>
            <radialGradient id="waterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e8f3f8" />
              <stop offset="60%" stopColor="#b4d5e7" />
              <stop offset="100%" stopColor="#7daec8" />
            </radialGradient>
          </defs>

          {/* Base Shadow */}
          <ellipse cx="150" cy="205" rx="100" ry="24" fill="#05080d" opacity="0.65" />

          {/* Outer Carved Lotus Petals Tier 1 */}
          <g fill="url(#bowlRadial)" stroke="#cfc3ab" strokeWidth="1.2">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <path
                key={deg}
                d="M 150,135 Q 175,70 150,55 Q 125,70 150,135"
                transform={`rotate(${deg} 150 135) scale(0.95)`}
              />
            ))}
          </g>

          {/* Main Solid Marble Bowl Body */}
          <ellipse cx="150" cy="135" rx="88" ry="46" fill="url(#bowlRadial)" stroke="#d9cdb8" strokeWidth="1.5" />

          {/* Water Surface inside Urli */}
          <ellipse cx="150" cy="135" rx="74" ry="36" fill="url(#waterGlow)" opacity="0.85" />

          {/* Floating Rose Petals & Brass Diya in Center */}
          <ellipse cx="150" cy="135" rx="14" ry="7" fill="#c5a059" stroke="#7a5c1a" strokeWidth="1" />
          <circle cx="150" cy="131" r="4" fill="#ffde59" />
          <path d="M 150,123 Q 153,128 150,131 Q 147,128 150,123" fill="#ff7043" />

          {/* Floating red rose petals */}
          <ellipse cx="120" cy="132" rx="7" ry="4" fill="#c0392b" transform="rotate(-15 120 132)" />
          <ellipse cx="178" cy="136" rx="8" ry="4" fill="#d9534f" transform="rotate(25 178 136)" />
          <ellipse cx="140" cy="150" rx="6" ry="3.5" fill="#c0392b" transform="rotate(10 140 150)" />
          <ellipse cx="165" cy="120" rx="6" ry="3.5" fill="#e74c3c" transform="rotate(-30 165 120)" />
        </svg>
      )}

      {type === 'lamp_jali' && (
        <svg viewBox="0 0 280 260" className="w-[82%] h-[82%] drop-shadow-2xl">
          <defs>
            <linearGradient id="lampMarble" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e3d8c5" />
              <stop offset="30%" stopColor="#fffcf5" />
              <stop offset="70%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#d8cca8" />
            </linearGradient>
            <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffaed" />
              <stop offset="40%" stopColor="#ffd875" />
              <stop offset="80%" stopColor="#e69500" />
              <stop offset="100%" stopColor="#874700" />
            </radialGradient>
          </defs>

          {/* Ambient Glow Aura */}
          <circle cx="140" cy="130" r="95" fill="url(#lampGlow)" opacity="0.28" filter="blur(16px)" />

          {/* Lamp Base Stand (Brass) */}
          <ellipse cx="140" cy="225" rx="58" ry="12" fill="#080c12" opacity="0.7" />
          <rect x="92" y="210" width="96" height="14" rx="4" fill="#b89345" stroke="#75561a" strokeWidth="1" />

          {/* Lamp Marble Cylindrical Tower */}
          <path
            d="M 98,60 L 182,60 L 182,210 L 98,210 Z"
            fill="url(#lampMarble)"
            stroke="#d4c4a5"
            strokeWidth="1.2"
          />

          {/* Domed Finial Top (Mughal Chhatri style) */}
          <path
            d="M 94,60 C 94,40 120,24 140,16 C 160,24 186,40 186,60 Z"
            fill="url(#lampMarble)"
            stroke="#cfbfa0"
            strokeWidth="1"
          />
          <circle cx="140" cy="14" r="3.5" fill="#d4af37" />

          {/* Intricate Perforated Jali Frets with Warm Amber Glow Shining Through */}
          {[80, 106, 132, 158, 184].map((y) => (
            <g key={y}>
              <rect x="110" y={y} width="12" height="16" rx="6" fill="#ffb703" opacity="0.9" />
              <rect x="134" y={y} width="12" height="16" rx="6" fill="#ffd166" opacity="0.95" />
              <rect x="158" y={y} width="12" height="16" rx="6" fill="#ffb703" opacity="0.9" />
              <circle cx="122" cy={y + 8} r="2" fill="#ffffff" />
              <circle cx="146" cy={y + 8} r="2" fill="#ffffff" />
              <circle cx="170" cy={y + 8} r="2" fill="#ffffff" />
            </g>
          ))}
        </svg>
      )}

      {type === 'mortar_pestle' && (
        <svg viewBox="0 0 300 240" className="w-[85%] h-[85%] drop-shadow-2xl">
          <defs>
            <linearGradient id="mortarMarble" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f3eee3" />
              <stop offset="100%" stopColor="#d5c8b2" />
            </linearGradient>
            <linearGradient id="pestleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#ede6d7" />
              <stop offset="100%" stopColor="#c5b79d" />
            </linearGradient>
          </defs>

          {/* Table shadow */}
          <ellipse cx="145" cy="208" rx="85" ry="18" fill="#06090e" opacity="0.65" />

          {/* Mortar Body (Solid heavy bowl) */}
          <path
            d="M 70,105 C 70,175 100,205 145,205 C 190,205 220,175 220,105 C 220,85 70,85 70,105 Z"
            fill="url(#mortarMarble)"
            stroke="#cfc1a7"
            strokeWidth="1.5"
          />

          {/* Mortar Beveled Lip Rim */}
          <ellipse cx="145" cy="100" rx="75" ry="24" fill="#faf6ee" stroke="#c0b195" strokeWidth="1.5" />
          {/* Mortar Interior Basin */}
          <ellipse cx="145" cy="104" rx="58" ry="17" fill="#ded5c2" stroke="#b4a689" strokeWidth="1" />

          {/* Natural Stone Veining */}
          <path
            d="M 88,125 Q 120,165 145,190"
            stroke="#b7a88f"
            strokeWidth="1.2"
            fill="none"
            opacity="0.5"
          />

          {/* Solid Marble Pestle resting at an angle */}
          <g transform="rotate(32 175 100)">
            <ellipse cx="175" cy="50" rx="14" ry="46" fill="url(#pestleGrad)" stroke="#c2b399" strokeWidth="1.2" />
            <circle cx="175" cy="12" r="14" fill="#f8f4ec" stroke="#c2b399" strokeWidth="1.2" />
          </g>
        </svg>
      )}

      {type === 'bath_set' && (
        <svg viewBox="0 0 320 220" className="w-[88%] h-[88%] drop-shadow-2xl">
          <defs>
            <linearGradient id="bathMarble" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f4efe6" />
              <stop offset="100%" stopColor="#dbceb9" />
            </linearGradient>
            <linearGradient id="goldPump" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f3d789" />
              <stop offset="50%" stopColor="#c5a059" />
              <stop offset="100%" stopColor="#8a692b" />
            </linearGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="160" cy="195" rx="120" ry="20" fill="#05080e" opacity="0.6" />

          {/* Base Vanity Tray */}
          <rect x="35" y="165" width="250" height="26" rx="8" fill="url(#bathMarble)" stroke="#cfc0a6" strokeWidth="1.2" />

          {/* Item 1: Liquid Soap Dispenser (Left) */}
          <g transform="translate(60, 48)">
            {/* Pump Head */}
            <rect x="25" y="14" width="8" height="24" rx="2" fill="url(#goldPump)" />
            <path d="M 29,14 L 14,14 L 12,20 L 29,20 Z" fill="url(#goldPump)" />
            <rect x="23" y="38" width="12" height="6" rx="2" fill="url(#goldPump)" />
            {/* Marble Cylinder */}
            <rect x="6" y="44" width="46" height="78" rx="6" fill="url(#bathMarble)" stroke="#cfc0a6" strokeWidth="1.2" />
            <ellipse cx="29" cy="44" rx="23" ry="5" fill="#fbf8f2" />
            <path d="M 12,65 Q 26,85 38,110" stroke="#bfb096" strokeWidth="1" fill="none" opacity="0.5" />
          </g>

          {/* Item 2: Marble Tumbler (Center) */}
          <g transform="translate(140, 78)">
            <rect x="8" y="14" width="42" height="76" rx="5" fill="url(#bathMarble)" stroke="#cfc0a6" strokeWidth="1.2" />
            <ellipse cx="29" cy="14" rx="21" ry="5" fill="#e6dcca" stroke="#bdae95" strokeWidth="0.8" />
            <path d="M 16,35 Q 24,55 36,75" stroke="#bfb096" strokeWidth="1" fill="none" opacity="0.5" />
          </g>

          {/* Item 3: Marble Soap Dish with Grooves (Right) */}
          <g transform="translate(210, 132)">
            <rect x="4" y="10" width="56" height="26" rx="6" fill="url(#bathMarble)" stroke="#cfc0a6" strokeWidth="1.2" />
            <ellipse cx="32" cy="10" rx="28" ry="6" fill="#f8f4ec" stroke="#cfc0a6" strokeWidth="0.8" />
            {/* Grooves */}
            <line x1="18" y1="8" x2="46" y2="8" stroke="#bdae95" strokeWidth="1.5" />
            <line x1="22" y1="12" x2="42" y2="12" stroke="#bdae95" strokeWidth="1.5" />
          </g>
        </svg>
      )}

      {type === 'desk_organizer' && (
        <svg viewBox="0 0 300 230" className="w-[85%] h-[85%] drop-shadow-2xl">
          <defs>
            <linearGradient id="officeMarble" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f4efe6" />
              <stop offset="100%" stopColor="#dbceb9" />
            </linearGradient>
            <linearGradient id="brassAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f3d789" />
              <stop offset="100%" stopColor="#8a692b" />
            </linearGradient>
          </defs>

          {/* Shadow */}
          <ellipse cx="150" cy="195" rx="100" ry="20" fill="#05080e" opacity="0.6" />

          {/* Marble Pen Cylinder */}
          <g transform="translate(70, 70)">
            <rect x="0" y="20" width="54" height="95" rx="6" fill="url(#officeMarble)" stroke="#cfc0a6" strokeWidth="1.2" />
            <ellipse cx="27" cy="20" rx="27" ry="6" fill="#ece3d3" stroke="#bcae94" strokeWidth="1" />
            {/* Pens sticking out */}
            <line x1="20" y1="20" x2="8" y2="-20" stroke="#c5a059" strokeWidth="4" strokeLinecap="round" />
            <line x1="30" y1="20" x2="28" y2="-28" stroke="#172b4d" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="38" y1="20" x2="48" y2="-15" stroke="#b89047" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Business Card Holder Stand */}
          <g transform="translate(150, 115)">
            <rect x="0" y="10" width="85" height="50" rx="6" fill="url(#officeMarble)" stroke="#cfc0a6" strokeWidth="1.2" />
            <rect x="10" y="5" width="65" height="10" rx="2" fill="url(#brassAccent)" />
            {/* Angled business card preview */}
            <rect x="14" y="-8" width="57" height="34" rx="2" fill="#fffdfa" stroke="#d5cbba" strokeWidth="0.8" transform="rotate(-4 14 -8)" />
            <line x1="20" y1="2" x2="45" y2="2" stroke="#c5a059" strokeWidth="1.5" />
            <line x1="20" y1="8" x2="58" y2="8" stroke="#8c9ba5" strokeWidth="1" />
          </g>
        </svg>
      )}

      {type === 'gift_hamper' && (
        <svg viewBox="0 0 300 240" className="w-[85%] h-[85%] drop-shadow-2xl">
          <defs>
            <linearGradient id="silkBox" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#962828" />
              <stop offset="50%" stopColor="#781919" />
              <stop offset="100%" stopColor="#4a0e0e" />
            </linearGradient>
            <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f7e09e" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#94701d" />
            </linearGradient>
          </defs>

          {/* Shadow */}
          <rect x="40" y="170" width="220" height="35" rx="10" fill="#05080e" opacity="0.65" />

          {/* Silk Trunk Box */}
          <rect x="45" y="70" width="210" height="115" rx="10" fill="url(#silkBox)" stroke="#b83838" strokeWidth="1" />

          {/* Gold Brocade Trim */}
          <rect x="45" y="98" width="210" height="8" fill="url(#goldRibbon)" />
          <rect x="140" y="70" width="16" height="115" fill="url(#goldRibbon)" />

          {/* Box Lid Lip */}
          <rect x="40" y="62" width="220" height="24" rx="6" fill="#a82e2e" stroke="url(#goldRibbon)" strokeWidth="1.2" />

          {/* Inlaid Marble Plaque on Chest */}
          <g transform="translate(148, 102)">
            <ellipse rx="22" ry="14" fill="#fcfaf5" stroke="url(#goldRibbon)" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="#2c5aa0" />
            <path d="M -8,0 Q 0,-4 8,0 Q 0,4 -8,0" fill="#196f3d" />
          </g>

          {/* Antique Brass Lock Clasp */}
          <rect x="142" y="74" width="12" height="18" rx="3" fill="url(#goldRibbon)" stroke="#5c430e" strokeWidth="0.8" />
          <circle cx="148" cy="83" r="2" fill="#302004" />
        </svg>
      )}

      {type === 'inlay_plate' && (
        <svg viewBox="0 0 300 240" className="w-[85%] h-[85%] drop-shadow-2xl">
          <defs>
            <radialGradient id="plateMarble" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f5f0e4" />
              <stop offset="100%" stopColor="#d9cdb8" />
            </radialGradient>
            <linearGradient id="lapisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3066be" />
              <stop offset="100%" stopColor="#113264" />
            </linearGradient>
            <linearGradient id="malachiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#229954" />
              <stop offset="100%" stopColor="#114e2a" />
            </linearGradient>
            <linearGradient id="carnelianGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e74c3c" />
              <stop offset="100%" stopColor="#922b21" />
            </linearGradient>
          </defs>

          {/* Stand Shadow */}
          <ellipse cx="150" cy="210" rx="90" ry="18" fill="#05080e" opacity="0.7" />

          {/* Wooden Easel Legs behind plate */}
          <path d="M 120,205 L 142,50 L 158,50 L 180,205" fill="#422517" opacity="0.9" />

          {/* Main 12-inch Circular Inlay Plate */}
          <circle cx="150" cy="120" r="88" fill="url(#plateMarble)" stroke="#d9ccb5" strokeWidth="2" />
          <circle cx="150" cy="120" r="82" fill="none" stroke="#c5a059" strokeWidth="1.2" />

          {/* Outer Inlay Garland Border (24 Pietra Dura florets) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 150 120)`}>
              <circle cx="150" cy="44" r="3" fill="url(#lapisGrad)" />
              <ellipse cx="146" cy="46" rx="2" ry="1" fill="url(#malachiteGrad)" />
              <ellipse cx="154" cy="46" rx="2" ry="1" fill="url(#malachiteGrad)" />
            </g>
          ))}

          {/* Center Mughal Tree of Life Motif */}
          <g transform="translate(150, 120)">
            <circle cx="0" cy="0" r="14" fill="url(#carnelianGrad)" stroke="#78281f" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="6" fill="#f4d03f" />

            {/* 8 Radial Inlaid Tendrils */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path d="M 0,-14 Q 8,-28 0,-42" stroke="#1e8449" strokeWidth="1.5" fill="none" />
                <circle cx="0" cy="-44" r="5" fill="url(#lapisGrad)" />
                <ellipse cx="6" cy="-28" rx="4" ry="2" fill="url(#malachiteGrad)" transform="rotate(30 6 -28)" />
                <ellipse cx="-6" cy="-28" rx="4" ry="2" fill="url(#malachiteGrad)" transform="rotate(-30 -6 -28)" />
              </g>
            ))}
          </g>
        </svg>
      )}

      {type === 'marble_elephant' && (
        <svg viewBox="0 0 300 240" className="w-[85%] h-[85%] drop-shadow-2xl">
          <defs>
            <linearGradient id="elephantMarble" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f3eee3" />
              <stop offset="100%" stopColor="#d5c8b2" />
            </linearGradient>
          </defs>

          {/* Shadow */}
          <ellipse cx="150" cy="200" rx="90" ry="16" fill="#05080e" opacity="0.65" />

          {/* Elephant Body Silhouette */}
          <path
            d="M 80,185 L 85,130 C 85,95 110,75 160,75 C 205,75 235,95 240,125 C 242,135 238,150 230,158 C 224,164 220,185 210,185 L 195,185 L 192,150 L 155,150 L 150,185 L 135,185 L 140,145 L 100,145 L 95,185 Z"
            fill="url(#elephantMarble)"
            stroke="#cfc1a7"
            strokeWidth="1.5"
          />

          {/* Elephant Trunk arched upward in royal greeting */}
          <path
            d="M 235,120 C 255,115 268,90 260,75 C 252,65 242,72 245,82 C 248,88 238,98 226,105"
            fill="url(#elephantMarble)"
            stroke="#cfc1a7"
            strokeWidth="1.5"
          />

          {/* Royal Mughal Blanket (Jhool) on Back */}
          <path
            d="M 125,95 L 195,95 L 190,135 L 130,135 Z"
            fill="#c5a059"
            stroke="#7d6124"
            strokeWidth="1"
          />
          <line x1="125" y1="135" x2="190" y2="135" stroke="#f4d03f" strokeWidth="2" strokeDasharray="3,3" />

          {/* Jali Openwork Perforations in Belly (Revealing Inner Baby Elephant) */}
          <g transform="translate(142, 118)">
            <circle cx="0" cy="0" r="14" fill="#0a0f17" stroke="#c5a059" strokeWidth="1" />
            {/* Baby Elephant Silhouette inside */}
            <path
              d="M -7,6 C -7,0 0,-4 6,0 C 9,2 9,6 8,8 Z"
              fill="#ffffff"
            />
            {/* Jali decorative cuts */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <circle key={deg} cx="0" cy="-18" r="1.5" fill="#c5a059" transform={`rotate(${deg})`} />
            ))}
          </g>

          {/* Ear and Eye */}
          <path d="M 205,100 C 190,105 190,128 205,125 Z" fill="#eee7dc" stroke="#c0b196" strokeWidth="1" />
          <circle cx="218" cy="98" r="2" fill="#201a12" />
          {/* Tusk */}
          <path d="M 230,130 Q 242,136 248,130" stroke="#fcfaf5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {type === 'rolling_pin' && (
        <svg viewBox="0 0 320 220" className="w-[88%] h-[88%] drop-shadow-2xl">
          <defs>
            <linearGradient id="pinMarble" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f5efe4" />
              <stop offset="100%" stopColor="#dcd0be" />
            </linearGradient>
            <linearGradient id="roseVein" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8cfca" />
              <stop offset="100%" stopColor="#cfaaa2" />
            </linearGradient>
          </defs>

          {/* Shadow */}
          <ellipse cx="160" cy="180" rx="110" ry="16" fill="#05080e" opacity="0.6" />

          {/* Marble Cradle Base */}
          <rect x="90" y="145" width="140" height="26" rx="6" fill="url(#pinMarble)" stroke="#cfc0a6" strokeWidth="1.2" />
          <path d="M 120,145 C 130,152 140,152 150,145" stroke="#bcae94" strokeWidth="1.5" fill="none" />
          <path d="M 170,145 C 180,152 190,152 200,145" stroke="#bcae94" strokeWidth="1.5" fill="none" />

          {/* Rolling Pin Cylindrical Barrel */}
          <rect x="70" y="85" width="180" height="38" rx="8" fill="url(#pinMarble)" stroke="#cfc0a6" strokeWidth="1.2" />

          {/* Banswara Rose Marble Veining */}
          <path d="M 85,95 Q 140,110 230,95" stroke="#d4b2aa" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 100,112 Q 180,100 240,114" stroke="#cfa49c" strokeWidth="1" fill="none" opacity="0.5" />

          {/* Stainless Steel / Brass Handles */}
          <path d="M 70,104 L 35,104 C 30,104 25,100 25,104 C 25,108 30,104 35,104" stroke="#c5a059" strokeWidth="7" strokeLinecap="round" />
          <circle cx="28" cy="104" r="5" fill="#f3d789" />

          <path d="M 250,104 L 285,104 C 290,104 295,100 295,104 C 295,108 290,104 285,104" stroke="#c5a059" strokeWidth="7" strokeLinecap="round" />
          <circle cx="292" cy="104" r="5" fill="#f3d789" />
        </svg>
      )}

      {type === 'soap_dispenser' && (
        <svg viewBox="0 0 280 240" className="w-[82%] h-[82%] drop-shadow-2xl">
          <defs>
            <linearGradient id="blackMarble" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c3440" />
              <stop offset="50%" stopColor="#1e2530" />
              <stop offset="100%" stopColor="#10151d" />
            </linearGradient>
            <linearGradient id="brassPump" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f3d789" />
              <stop offset="50%" stopColor="#c5a059" />
              <stop offset="100%" stopColor="#8a692b" />
            </linearGradient>
          </defs>

          {/* Base Shadow */}
          <ellipse cx="140" cy="205" rx="55" ry="14" fill="#040609" opacity="0.75" />

          {/* Pump Mechanism */}
          <rect x="135" y="30" width="10" height="35" rx="2" fill="url(#brassPump)" />
          <path d="M 140,30 L 110,30 L 106,38 L 140,38 Z" fill="url(#brassPump)" />
          <rect x="131" y="65" width="18" height="8" rx="2" fill="url(#brassPump)" />

          {/* Black Marquina Heavy Marble Base */}
          <rect x="100" y="73" width="80" height="125" rx="10" fill="url(#blackMarble)" stroke="#3a4556" strokeWidth="1.2" />
          <ellipse cx="140" cy="73" rx="40" ry="7" fill="#364050" />

          {/* Striking White Calcite Veining in Black Marble */}
          <path d="M 110,90 Q 140,130 165,185" stroke="#e2e8f0" strokeWidth="1.8" fill="none" opacity="0.8" />
          <path d="M 145,115 Q 160,130 170,145" stroke="#cbd5e1" strokeWidth="1" fill="none" opacity="0.6" />
        </svg>
      )}

      {/* Luxury gold shimmer border on hover */}
      <div className="absolute inset-0 border border-transparent hover:border-[#c5a059]/30 transition-colors pointer-events-none rounded-sm" />
    </div>
  );
};
