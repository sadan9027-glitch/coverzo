import React, { useState } from 'react';
import { DEVICE_MODELS } from '../data/mockData';

interface ModelSelectorScreenProps {
  currentModel: string;
  onApplyModel: (modelName: string) => void;
  onOpenImeiScan: () => void;
  onShowToast: (msg: string) => void;
}

export const ModelSelectorScreen: React.FC<ModelSelectorScreenProps> = ({
  currentModel,
  onApplyModel,
  onOpenImeiScan,
  onShowToast
}) => {
  const [selectedModel, setSelectedModel] = useState<string>(currentModel);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('popular');
  const [openSeries, setOpenSeries] = useState<{ [key: string]: boolean }>({
    'iPhone 15 Series': true,
    'iPhone 14 Series': false,
    'iPhone 13 Series': false,
    'Galaxy S24 Series': false,
  });

  const brandTabs = [
    { id: 'popular', label: 'Popular' },
    { id: 'apple', label: 'Apple' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'oneplus', label: 'OnePlus' },
    { id: 'nothing', label: 'Nothing' },
    { id: 'vivo', label: 'Vivo' },
    { id: 'google', label: 'Pixel' },
    { id: 'xiaomi', label: 'Xiaomi' },
  ];

  const trendingFits = [
    { name: 'Galaxy S24 Ultra', count: 98 },
    { name: 'OnePlus 12', count: 76 },
    { name: 'Nothing Phone (2)', count: 54 },
    { name: 'Vivo X100 Pro', count: 42 },
  ];

  const toggleSeries = (seriesName: string) => {
    setOpenSeries(prev => ({ ...prev, [seriesName]: !prev[seriesName] }));
  };

  // Find count for selected model
  const activeDeviceObj = DEVICE_MODELS.find(m => m.name === selectedModel);
  const activeCaseCount = activeDeviceObj ? activeDeviceObj.caseCount : 142;

  // Filter models based on search and brand
  const filteredModels = DEVICE_MODELS.filter(m => {
    const matchesSearch = searchQuery === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.displaySize.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrand === 'popular'
      ? (m.isPopular || searchQuery !== '')
      : (m.brand === selectedBrand || searchQuery !== '');

    return matchesSearch && matchesBrand;
  });

  // Group filtered models by series
  const seriesGroups: { [key: string]: typeof DEVICE_MODELS } = {};
  filteredModels.forEach(m => {
    if (!seriesGroups[m.series]) {
      seriesGroups[m.series] = [];
    }
    seriesGroups[m.series].push(m);
  });

  const handleSelectModel = (modelName: string, count: number) => {
    setSelectedModel(modelName);
    onShowToast(`Selected ${modelName} (${count} cases)`);
  };

  const handleApply = () => {
    onApplyModel(selectedModel);
  };

  return (
    <div className="flex flex-col w-full pb-36 px-4 pt-3 max-w-md mx-auto space-y-4">
      {/* Top Guarantee & Count Badges */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse" />
            <span className="text-[11px] uppercase tracking-wider text-tertiary font-extrabold">
              100% Fit Guarantee
            </span>
          </div>
          <span className="text-xs text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full font-medium">
            2,400+ Total Cases Live
          </span>
        </div>

        <h2 className="font-display text-2xl font-bold text-on-surface">Select Your Device</h2>
        <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
          We customize every catalog feed so you only see cases precision-engineered for your camera bump and ports.
        </p>
      </div>

      {/* Model Search Bar */}
      <div className="relative w-full">
        <div className="relative flex items-center bg-surface-container-low rounded-xl px-3.5 py-2.5 shadow-xs border border-surface-container-high/60 focus-within:bg-surface-container-lowest focus-within:border-primary/50 transition-all">
          <span className="material-symbols-outlined text-[20px] text-primary mr-2">search</span>
          <input
            className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-on-surface placeholder:text-outline font-sans"
            placeholder="Type phone model (e.g. iPhone 15, S24, OnePlus)..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-outline hover:text-on-surface p-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>
      </div>

      {/* Brand Tabs Strip */}
      <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4">
        <div className="flex items-center gap-1.5 min-w-max pb-1">
          {brandTabs.map((tab) => {
            const isActive = selectedBrand === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedBrand(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                  isActive
                    ? 'bg-inverse-surface text-inverse-on-surface shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trending Fits Quick Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
            Trending Fits Right Now
          </span>
          <span className="text-xs text-secondary font-bold">High Demand</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {trendingFits.map((fit) => (
            <div
              key={fit.name}
              onClick={() => handleSelectModel(fit.name, fit.count)}
              className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer active:scale-95 transition-all border ${
                selectedModel === fit.name
                  ? 'bg-primary-fixed border-primary/40 text-on-primary-fixed shadow-xs'
                  : 'bg-surface-container-low border-surface-container-high/60 hover:bg-surface-container'
              }`}
            >
              <div className="min-w-0 pr-1">
                <p className="text-xs font-bold text-on-surface truncate">{fit.name}</p>
                <p className="text-[10px] text-on-surface-variant">{fit.count} designs</p>
              </div>
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0">north_east</span>
            </div>
          ))}
        </div>
      </div>

      {/* Model Lineup Sections */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">phone_iphone</span>
            <h3 className="font-bold text-sm text-on-surface font-sans">
              {selectedBrand === 'apple' || selectedBrand === 'popular' ? 'Apple iPhone Lineup' : `${selectedBrand.toUpperCase()} Lineup`}
            </h3>
          </div>
          <span className="text-[11px] text-on-surface-variant">Tap to pick model</span>
        </div>

        {/* iPhone 15 Series (or Primary Series) */}
        {Object.keys(seriesGroups).map((seriesName) => {
          const modelsInSeries = seriesGroups[seriesName];
          const isLatest = seriesName.includes('15') || seriesName.includes('24');
          const isExpanded = openSeries[seriesName] ?? isLatest;

          return (
            <div key={seriesName} className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-surface-container-high/60">
              <div
                className="flex items-center justify-between pb-2 cursor-pointer select-none"
                onClick={() => toggleSeries(seriesName)}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isLatest ? 'bg-primary' : 'bg-outline-variant'}`} />
                  <span className="text-xs font-bold text-on-surface">{seriesName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {isLatest && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                      Latest Release
                    </span>
                  )}
                  <span className="text-[11px] text-on-surface-variant font-medium">
                    {modelsInSeries.length} models
                  </span>
                  <span
                    className={`material-symbols-outlined text-[18px] text-on-surface-variant transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="flex flex-col gap-1.5 pt-1">
                  {modelsInSeries.map((m) => {
                    const isSelected = selectedModel === m.name;
                    return (
                      <div
                        key={m.id}
                        onClick={() => handleSelectModel(m.name, m.caseCount)}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-primary-fixed text-on-primary-fixed border-primary/30 shadow-xs'
                            : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {isSelected ? 'check_circle' : 'smartphone'}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold truncate text-on-surface">{m.name}</p>
                              {isSelected && (
                                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                                  Active
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-on-surface-variant truncate font-sans">
                              {m.displaySize}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[11px] ${isSelected ? 'font-bold text-on-primary-fixed' : 'text-on-surface-variant'}`}>
                            {m.caseCount} cases
                          </span>
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              isSelected ? 'text-primary' : 'text-outline-variant'
                            }`}
                            style={isSelected ? { fontVariationSettings: "'FILL' 1" } : undefined}
                          >
                            {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Why select your model first? Card */}
      <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-surface-container-high/60 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-surface-container relative">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIZjoXqs_WxfKMuXsqkxiVY0iecxxiG5v6SzXAFScPNnaGJQ6-9h9-ynuc-g4yDwODPk_qHbHeQ_H5x9YvVS1ih0i7mcTRgRuvjRsK55qjW8nz86rKo2gNCKOq_FmeNbAQiKPiTMiLffjygx7zSg5up_vZyAQ6gqt6mdGOfKmPZCg0mngFQeNKW9guIR6gdTL2jYODAg9G-N8H4Ao5W9bfrJhWwsaeEKVaBsLV67QK5ZxRZ8LbgRwurg"
              alt="Laser-cut precision camera bumper"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="text-xs font-bold">Why select your model first?</span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">Zero guesswork shopping experience.</p>
          </div>
        </div>

        <div className="bg-surface-container-low p-2.5 rounded-lg flex items-start gap-2 text-on-surface">
          <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5 shrink-0">check_box</span>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            Every case features laser-cut camera rings, tactile buttons, and heat dissipation tailored strictly to your device dimensions. Zero fit errors or return hassles.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
          <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container-high/50">
            <span className="material-symbols-outlined text-[18px] text-primary">straighten</span>
            <p className="text-[11px] text-on-surface font-bold mt-0.5">0.1mm Fit</p>
          </div>
          <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container-high/50">
            <span className="material-symbols-outlined text-[18px] text-secondary">flash_on</span>
            <p className="text-[11px] text-on-surface font-bold mt-0.5">MagSafe Ready</p>
          </div>
          <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container-high/50">
            <span className="material-symbols-outlined text-[18px] text-tertiary">autorenew</span>
            <p className="text-[11px] text-on-surface font-bold mt-0.5">Free Swap</p>
          </div>
        </div>
      </div>

      {/* Need assistance card */}
      <div className="relative w-full rounded-2xl overflow-hidden p-3.5 bg-gradient-to-r from-primary to-primary-container text-on-primary shadow-sm">
        <div className="relative z-10 flex items-center justify-between">
          <div className="min-w-0 pr-3">
            <span className="text-[10px] uppercase tracking-wider text-on-primary-container font-extrabold">Need assistance?</span>
            <p className="text-xs font-bold mt-0.5">Don't know your exact variant?</p>
            <p className="text-[11px] text-on-primary-container mt-0.5">Check Settings &gt; General &gt; About or scan your IMEI.</p>
          </div>
          <button
            onClick={onOpenImeiScan}
            aria-label="Auto detect device"
            className="w-10 h-10 rounded-full bg-surface text-primary flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">phonelink_setup</span>
          </button>
        </div>
      </div>

      {/* Sticky Bottom Bar for applying selection */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl border-t border-surface-container-high/70 p-3 shadow-lg">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
              <span className="text-xs text-on-surface font-medium">
                Selected: <strong className="font-bold text-primary">{selectedModel}</strong>
              </span>
            </div>
            <span className="text-[11px] font-bold text-tertiary bg-tertiary-fixed/40 px-2 py-0.5 rounded-full">
              {activeCaseCount} Cases Available
            </span>
          </div>

          <button
            onClick={handleApply}
            className="w-full h-12 bg-primary text-on-primary rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(79,70,229,0.35)] active:scale-[0.98] transition-all hover:bg-primary/95"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">explore</span>
            <span>Apply Model &amp; Explore {activeCaseCount} Compatible Cases</span>
          </button>
        </div>
      </div>
    </div>
  );
};
