import React from "react"

// SVGs for each equipment (medium pastel gradients, visible stroke, soft shadow)
const icons = [
  // Shoe
  () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shoeGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a5b4fc"/>
          <stop offset="1" stopColor="#c4b5fd"/>
        </linearGradient>
      </defs>
      <path d="M6 36c0-4 2-8 8-8h12c2 0 4-2 4-4s-2-4-4-4H18c-2 0-4-2-4-4s2-4 4-4h8c8 0 12 8 12 16v4a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill="url(#shoeGrad)" stroke="#7c3aed" strokeWidth="2" filter="url(#shadow)"/>
      <filter id="shadow" x="-10" y="-10" width="68" height="68" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#a5b4fc" floodOpacity="0.22"/>
      </filter>
    </svg>
  ),
  // Headphones
  () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c7d2fe"/>
          <stop offset="1" stopColor="#a5b4fc"/>
        </linearGradient>
      </defs>
      <path d="M8 32v-4a16 16 0 0 1 32 0v4" stroke="#6366f1" strokeWidth="2"/>
      <rect x="4" y="32" width="8" height="12" rx="4" fill="url(#headGrad)" stroke="#6366f1" strokeWidth="2" filter="url(#shadow)"/>
      <rect x="36" y="32" width="8" height="12" rx="4" fill="url(#headGrad)" stroke="#6366f1" strokeWidth="2" filter="url(#shadow)"/>
      <filter id="shadow" x="-10" y="-10" width="68" height="68" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#a5b4fc" floodOpacity="0.22"/>
      </filter>
    </svg>
  ),
  // T-shirt
  () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shirtGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f3e8ff"/>
          <stop offset="1" stopColor="#a5b4fc"/>
        </linearGradient>
      </defs>
      <path d="M8 8l8-4 8 4 8-4 8 4v8l-4 4v20a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V20l-4-4V8Z" fill="url(#shirtGrad)" stroke="#7c3aed" strokeWidth="2" filter="url(#shadow)"/>
      <filter id="shadow" x="-10" y="-10" width="68" height="68" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#a5b4fc" floodOpacity="0.22"/>
      </filter>
    </svg>
  ),
  // Shopping bag
  () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bagGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef9c3"/>
          <stop offset="1" stopColor="#a5b4fc"/>
        </linearGradient>
      </defs>
      <rect x="8" y="16" width="32" height="24" rx="4" fill="url(#bagGrad)" stroke="#6366f1" strokeWidth="2" filter="url(#shadow)"/>
      <path d="M16 16V12a8 8 0 0 1 16 0v4" stroke="#6366f1" strokeWidth="2"/>
      <filter id="shadow" x="-10" y="-10" width="68" height="68" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#a5b4fc" floodOpacity="0.22"/>
      </filter>
    </svg>
  ),
  // Mobile
  () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mobGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bae6fd"/>
          <stop offset="1" stopColor="#a5b4fc"/>
        </linearGradient>
      </defs>
      <rect x="12" y="4" width="24" height="40" rx="4" fill="url(#mobGrad)" stroke="#6366f1" strokeWidth="2" filter="url(#shadow)"/>
      <circle cx="24" cy="40" r="2" fill="#6366f1"/>
      <filter id="shadow" x="-10" y="-10" width="68" height="68" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#a5b4fc" floodOpacity="0.22"/>
      </filter>
    </svg>
  ),
  // Watch
  () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="watchGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef9c3"/>
          <stop offset="1" stopColor="#a5b4fc"/>
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="10" fill="url(#watchGrad)" stroke="#7c3aed" strokeWidth="2" filter="url(#shadow)"/>
      <rect x="20" y="2" width="8" height="8" rx="2" fill="#7c3aed"/>
      <rect x="20" y="38" width="8" height="8" rx="2" fill="#7c3aed"/>
      <filter id="shadow" x="-10" y="-10" width="68" height="68" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#a5b4fc" floodOpacity="0.22"/>
      </filter>
    </svg>
  ),
  // Gift box
  () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="giftGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f3e8ff"/>
          <stop offset="1" stopColor="#fef9c3"/>
        </linearGradient>
      </defs>
      <rect x="8" y="20" width="32" height="20" rx="2" fill="url(#giftGrad)" stroke="#7c3aed" strokeWidth="2" filter="url(#shadow)"/>
      <path d="M8 24h32" stroke="#7c3aed" strokeWidth="2"/>
      <rect x="20" y="8" width="8" height="12" rx="2" fill="#f3e8ff"/>
      <path d="M24 8c-2 0-6 2-6 6s4 6 6 6 6-2 6-6-4-6-6-6Z" fill="#fef9c3"/>
      <filter id="shadow" x="-10" y="-10" width="68" height="68" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#a5b4fc" floodOpacity="0.22"/>
      </filter>
    </svg>
  ),
]

// Randomized style helpers
const random = (min: number, max: number) => Math.random() * (max - min) + min

const floatingConfigs = [
  // Each config: {top, left, size, opacity, animationDelay, animationDuration, rotate}
  { top: '8%', left: '6%', size: 54, opacity: 0.26, delay: 0, duration: 7, rotate: 8 },
  { top: '22%', left: '80%', size: 48, opacity: 0.24, delay: 1, duration: 8, rotate: -12 },
  { top: '70%', left: '10%', size: 52, opacity: 0.22, delay: 2, duration: 9, rotate: 16 },
  { top: '60%', left: '85%', size: 60, opacity: 0.28, delay: 1.5, duration: 7.5, rotate: -18 },
  { top: '40%', left: '18%', size: 46, opacity: 0.23, delay: 2.5, duration: 8.5, rotate: 10 },
  { top: '80%', left: '60%', size: 58, opacity: 0.27, delay: 0.5, duration: 10, rotate: 20 },
  { top: '15%', left: '55%', size: 50, opacity: 0.25, delay: 3, duration: 9.5, rotate: -8 },
]

export default function FloatingEquipments() {
  return (
    <div className="pointer-events-none select-none">
      {icons.map((Icon, i) => {
        const cfg = floatingConfigs[i]
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: cfg.top,
              left: cfg.left,
              width: cfg.size,
              height: cfg.size,
              opacity: cfg.opacity,
              zIndex: 1,
              transform: `rotate(${cfg.rotate}deg)`
            }}
            className={`floating-equip-${i}`}
          >
            <span
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                filter: 'drop-shadow(0 6px 16px #a5b4fc44)',
                animation: `floatY${i} ${cfg.duration}s cubic-bezier(.39,.575,.565,1) ${cfg.delay}s infinite alternate, floatPop${i} ${cfg.duration * 2}s ease-in-out ${cfg.delay}s infinite alternate`,
              }}
            >
              <Icon />
            </span>
          </div>
        )
      })}
      <style jsx>{`
        ${floatingConfigs.map((cfg, i) => `
          @keyframes floatY${i} {
            0% { transform: translateY(0) scale(1) rotate(0deg); }
            100% { transform: translateY(-30px) scale(1.08) rotate(4deg); }
          }
          @keyframes floatPop${i} {
            0% { filter: drop-shadow(0 6px 16px #a5b4fc44); }
            100% { filter: drop-shadow(0 12px 32px #a5b4fc66); }
          }
        `).join('')}
      `}</style>
    </div>
  )
} 