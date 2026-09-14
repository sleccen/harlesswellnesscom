type SpineDividerProps = {
  className?: string;
};

const VERTEBRAE = Array.from({ length: 17 }, (_, i) => i);

/**
 * Decorative horizontal 2D spine illustration.
 * Uses design-system tokens (primary / border) so it matches the theme.
 */
export function SpineDivider({ className }: SpineDividerProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 680 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-full text-primary sm:h-20"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="spine-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="18%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="82%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <mask id="spine-mask">
            <rect x="0" y="0" width="680" height="80" fill="url(#spine-fade)" />
          </mask>
        </defs>

        <g mask="url(#spine-mask)" stroke="currentColor" strokeLinecap="round">
          {/* spinal cord curve */}
          <path
            d="M8 40 C 100 18, 180 62, 268 40 S 440 18, 528 40 S 640 58, 672 40"
            strokeWidth="2"
            opacity="0.35"
          />

          {VERTEBRAE.map((i) => {
            const x = 20 + i * 40;
            const y = 40 + Math.sin(i * 0.72) * 9;
            const angle = Math.cos(i * 0.72) * 16;
            return (
              <g key={i} transform={`translate(${x} ${y}) rotate(${angle})`}>
                {/* vertebral body */}
                <rect
                  x="-13"
                  y="-11"
                  width="26"
                  height="22"
                  rx="7"
                  fill="currentColor"
                  fillOpacity="0.14"
                  strokeWidth="1.75"
                />
                {/* transverse processes */}
                <path d="M-13 0 L-22 -7" strokeWidth="1.75" opacity="0.7" />
                <path d="M13 0 L22 7" strokeWidth="1.75" opacity="0.7" />
                {/* disc */}
                <circle cx="0" cy="0" r="3" fill="currentColor" fillOpacity="0.55" stroke="none" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default SpineDivider;
