import React from 'react';

interface LiveGpsModalProps {
  isOpen: boolean;
  onClose: () => void;
  awb: string;
}

export const LiveGpsModal: React.FC<LiveGpsModalProps> = ({ isOpen, onClose, awb }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-ping" />
            <h3 className="font-sans font-bold text-sm text-on-surface">Live Delhivery GPS Transit</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Map View Simulation */}
        <div className="relative h-64 bg-slate-100 overflow-hidden flex items-center justify-center">
          {/* Custom SVG Map Grid with Route Path */}
          <svg className="w-full h-full object-cover" viewBox="0 0 400 240" fill="none">
            {/* Background Map Blocks */}
            <rect width="400" height="240" fill="#f8fafc" />
            <rect x="20" y="20" width="80" height="60" rx="8" fill="#e2e8f0" />
            <rect x="120" y="20" width="140" height="50" rx="8" fill="#e2e8f0" />
            <rect x="280" y="20" width="100" height="90" rx="8" fill="#e2e8f0" />
            <rect x="20" y="100" width="120" height="80" rx="8" fill="#e2e8f0" />
            <rect x="160" y="90" width="90" height="70" rx="8" fill="#e2e8f0" />
            <rect x="270" y="130" width="110" height="90" rx="8" fill="#e2e8f0" />

            {/* Roads */}
            <path d="M 0 80 Q 150 85 270 120 T 400 130" stroke="#cbd5e1" strokeWidth="18" fill="none" />
            <path d="M 150 0 L 150 240" stroke="#cbd5e1" strokeWidth="14" fill="none" />
            <path d="M 260 0 L 260 240" stroke="#cbd5e1" strokeWidth="12" fill="none" />

            {/* Animated Delivery Route Line */}
            <path
              d="M 60 80 Q 150 85 200 105 T 310 160"
              stroke="#3525cd"
              strokeWidth="5"
              strokeDasharray="8 4"
              fill="none"
              className="animate-pulse"
            />

            {/* Hub Start Point */}
            <circle cx="60" cy="80" r="10" fill="#006e47" />
            <circle cx="60" cy="80" r="5" fill="#ffffff" />
            <text x="50" y="60" fill="#006e47" fontSize="10" fontWeight="bold">Sort Hub</text>

            {/* Delivery Van Position */}
            <g transform="translate(195, 95)" className="animate-bounce">
              <circle cx="10" cy="10" r="16" fill="#ff5722" fillOpacity="0.25" />
              <circle cx="10" cy="10" r="11" fill="#ff5722" />
              <text x="5" y="14" fill="#ffffff" fontSize="12" fontFamily="sans-serif">🚚</text>
            </g>

            {/* Destination Target (Rahul's Home) */}
            <g transform="translate(300, 150)">
              <circle cx="10" cy="10" r="14" fill="#3525cd" fillOpacity="0.2" />
              <circle cx="10" cy="10" r="8" fill="#3525cd" />
              <text x="25" y="14" fill="#1c1b1d" fontSize="11" fontWeight="bold">Bellandur Home</text>
            </g>
          </svg>

          {/* Floating ETA badge */}
          <div className="absolute top-3 left-3 bg-surface/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-surface-container-high text-xs">
            <span className="text-on-surface-variant font-medium">Estimated Arrival: </span>
            <strong className="text-secondary font-bold">Tomorrow, 3:30 PM</strong>
          </div>

          <div className="absolute bottom-3 right-3 bg-inverse-surface/85 text-inverse-on-surface px-2.5 py-1 rounded-full text-[11px] font-mono">
            AWB: {awb}
          </div>
        </div>

        {/* Courier & Driver Profile Info */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">
                RK
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Ramesh Kumar</p>
                <p className="text-xs text-on-surface-variant">Delhivery Express Priority • KA 01 EK 4920</p>
              </div>
            </div>

            <a
              href="tel:+919876543210"
              className="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-xs"
              title="Call Delivery Partner"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
            </a>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="text-on-surface-variant block text-[11px]">Delivery Verification OTP</span>
              <span className="font-mono text-base font-extrabold text-primary tracking-widest">7482</span>
            </div>
            <span className="text-[11px] text-tertiary bg-tertiary-fixed/30 px-2 py-0.5 rounded-full font-bold">
              Share only upon receiving parcel
            </span>
          </div>

          <div className="text-[11px] text-on-surface-variant leading-relaxed">
            Parcel inspected at Bengaluru Sorting Center (Hub 1) with tamper-proof security tape. 100% replacement guarantee if box seal is broken.
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container-highest transition-colors"
          >
            Dismiss Live Tracking
          </button>
        </div>
      </div>
    </div>
  );
};
