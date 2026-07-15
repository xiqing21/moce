export function MoceLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="moceGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      {/* Folded ribbon / cube logo inspired by prototype */}
      <path
        d="M8 12L20 5L32 12V28L20 35L8 28V12Z"
        fill="url(#moceGrad)"
      />
      <path
        d="M20 5V20M20 20L8 12M20 20L32 12M20 20V35"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M8 12L20 20L32 12"
        stroke="white"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <path
        d="M14 16.5L20 13L26 16.5V23.5L20 27L14 23.5V16.5Z"
        fill="white"
        opacity="0.95"
      />
      <path
        d="M20 13V20M14 16.5L26 23.5M26 16.5L14 23.5"
        stroke="#f97316"
        strokeWidth="1"
        opacity="0.8"
      />
    </svg>
  )
}

export function InsightIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-lg bg-orange-500 text-white ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-[60%] h-[60%]">
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M5 6a2 2 0 012-2h10a2 2 0 012 2v9a2 2 0 01-2 2H9l-4 3V6z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </span>
  )
}

export function DataAgentIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-lg bg-violet-500 text-white ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-[60%] h-[60%]">
        <circle cx="6" cy="12" r="2.2" fill="currentColor" />
        <circle cx="18" cy="7" r="2.2" fill="currentColor" />
        <circle cx="18" cy="17" r="2.2" fill="currentColor" />
        <path d="M8 12h8M16 8.2l-6.5 3M16 15.8l-6.5-3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  )
}

export function AlphaIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-lg bg-orange-500 text-white ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-[58%] h-[58%]">
        <path d="M12 4L5 18h3.2l1.2-3.2h5.2L16 18H19L12 4zm-1.4 8.2L12 7.6l1.4 4.6h-2.8z" fill="currentColor" />
      </svg>
    </span>
  )
}
