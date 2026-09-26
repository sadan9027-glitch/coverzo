import React, { useState } from 'react';

interface ImeiScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModel: (modelName: string) => void;
}

export const ImeiScanModal: React.FC<ImeiScanModalProps> = ({
  isOpen,
  onClose,
  onSelectModel
}) => {
  const [detecting, setDetecting] = useState(false);
  const [detectedModel, setDetectedModel] = useState<string | null>(null);
  const [imeiInput, setImeiInput] = useState('');

  if (!isOpen) return null;

  const handleAutoDetect = () => {
    setDetecting(true);
    setTimeout(() => {
      setDetecting(false);
      setDetectedModel('iPhone 15 Pro');
    }, 900);
  };

  const handleImeiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imeiInput.length >= 8) {
      setDetecting(true);
      setTimeout(() => {
        setDetecting(false);
        setDetectedModel('iPhone 15 Pro (128GB - Natural Titanium)');
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-surface-container-high p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">phonelink_setup</span>
            </div>
            <h3 className="font-bold text-sm text-on-surface">Auto-Detect Device</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed">
          Not sure about your exact model variant? We can inspect your browser client screen geometry or decode your IMEI for 100% precision fit.
        </p>

        {detectedModel ? (
          <div className="p-3.5 bg-primary-fixed rounded-xl space-y-2 border border-primary/20">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span className="text-xs font-bold uppercase tracking-wider">Device Identified</span>
            </div>
            <p className="text-sm font-extrabold text-on-primary-fixed">{detectedModel}</p>
            <p className="text-[11px] text-on-primary-fixed-variant">Camera ring bump & action button verified.</p>
            <button
              onClick={() => {
                onSelectModel('iPhone 15 Pro');
                onClose();
              }}
              className="w-full mt-2 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-all"
            >
              Apply iPhone 15 Pro
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleAutoDetect}
              disabled={detecting}
              className="w-full py-3 px-4 bg-primary text-on-primary rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">
                {detecting ? 'sync' : 'screen_search_desktop'}
              </span>
              <span>{detecting ? 'Scanning Screen & Ports...' : 'Scan Active Device Screen'}</span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-surface-container-high" />
              <span className="flex-shrink mx-2 text-[10px] uppercase text-on-surface-variant font-bold">OR ENTER IMEI</span>
              <div className="flex-grow border-t border-surface-container-high" />
            </div>

            <form onSubmit={handleImeiSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Dial *#06# to get 15-digit IMEI"
                value={imeiInput}
                onChange={(e) => setImeiInput(e.target.value)}
                maxLength={15}
                className="w-full text-xs p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={imeiInput.length < 8 || detecting}
                className="w-full py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold rounded-xl transition-colors disabled:opacity-40"
              >
                Lookup Variant Specs
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
