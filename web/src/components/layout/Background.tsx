/** Animated network / particle background matching prototype aesthetics */
export function Background() {
  return (
    <div className="bg-layer pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="bg-base absolute inset-0" />
      <div className="bg-warm absolute inset-0" />

      <div className="absolute -left-20 top-1/4 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.14),transparent_70%)]" style={{ animation: 'pulse-glow 6s ease-in-out infinite' }} />
      <div className="absolute -right-16 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.18),transparent_68%)]" style={{ animation: 'pulse-glow 7s ease-in-out infinite 1s' }} />
      <div className="absolute right-0 bottom-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.1),transparent_70%)]" />

      {/* Right constellation — animated strokes */}
      <svg
        className="absolute right-0 top-0 h-full w-[55%] opacity-[0.6]"
        viewBox="0 0 800 900"
        fill="none"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fdba74" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#fb923c" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g stroke="url(#lineGrad)" strokeWidth="1.1" className="bg-network-line">
          <path d="M120 80 L220 160 L340 120 L480 200 L620 140 L720 220" />
          <path d="M80 200 L180 280 L300 240 L420 320 L560 280 L700 360" />
          <path d="M160 360 L280 420 L400 380 L520 460 L640 400 L760 480" />
          <path d="M100 480 L220 540 L360 500 L500 580 L640 520 L740 600" />
          <path d="M140 640 L260 700 L400 660 L540 740 L680 680" />
          <path d="M220 160 L180 280 L280 420 L220 540 L260 700" />
          <path d="M340 120 L300 240 L400 380 L360 500 L400 660" />
          <path d="M480 200 L420 320 L520 460 L500 580 L540 740" />
          <path d="M620 140 L560 280 L640 400 L640 520 L680 680" />
        </g>

        {[
          [120, 80], [220, 160], [340, 120], [480, 200], [620, 140], [720, 220],
          [80, 200], [180, 280], [300, 240], [420, 320], [560, 280], [700, 360],
          [160, 360], [280, 420], [400, 380], [520, 460], [640, 400], [760, 480],
          [100, 480], [220, 540], [360, 500], [500, 580], [640, 520], [740, 600],
          [140, 640], [260, 700], [400, 660], [540, 740], [680, 680],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i % 5 === 0 ? 16 : 9} fill="url(#nodeGlow)" opacity={0.4} />
            <circle
              cx={x}
              cy={y}
              r={i % 5 === 0 ? 3.6 : 2.3}
              fill="#fb923c"
              opacity={0.9}
              style={{ animation: `pulse-glow ${2.4 + (i % 5) * 0.3}s ease-in-out infinite ${i * 0.08}s` }}
            />
          </g>
        ))}
      </svg>

      {/* Left faint network */}
      <svg
        className="absolute left-0 top-20 h-[70%] w-[32%] opacity-[0.32]"
        viewBox="0 0 400 700"
        fill="none"
        preserveAspectRatio="xMinYMid slice"
      >
        <g stroke="#fdba74" strokeWidth="1" className="bg-network-line" opacity="0.8">
          <path d="M40 40 L120 100 L60 180 L140 240 L80 320 L160 400 L100 480 L180 560" />
          <path d="M120 100 L200 80 L260 160 L200 240 L280 300 L220 400 L300 460" />
          <path d="M60 180 L200 240 L160 400 L220 400" />
        </g>
        {[
          [40, 40], [120, 100], [60, 180], [140, 240], [80, 320], [160, 400],
          [100, 480], [180, 560], [200, 80], [260, 160], [200, 240], [280, 300],
          [220, 400], [300, 460],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.2} fill="#fb923c" opacity={0.75} />
        ))}
      </svg>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
