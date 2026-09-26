import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface ReturnExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ReturnExchangeModal: React.FC<ReturnExchangeModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [requestType, setRequestType] = useState<'exchange' | 'return'>('exchange');
  const [reason, setReason] = useState<string>('wrong_model');
  const [exchangeModel, setExchangeModel] = useState('iPhone 15 Pro Max (6.7")');
  const [refundMethod, setRefundMethod] = useState<'coins' | 'upi'>('coins');
  const [uploadedPhotos, setUploadedPhotos] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const quickModels = [
    'iPhone 15 Pro Max (6.7")',
    'iPhone 15 Plus (6.7")',
    'iPhone 15 Standard (6.1")',
    'iPhone 14 Pro (6.1")',
  ];

  const handlePhotoUpload = (slot: string) => {
    setUploadedPhotos((prev) => ({ ...prev, [slot]: true }));
    onShowToast(`Uploaded proof for ${slot}`);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.5 }
        });
      } catch {
        // Safe fallback
      }
      onShowToast(
        requestType === 'exchange'
          ? 'Model exchange scheduled with Delhivery Express!'
          : 'Return request approved. QC doorstep pickup tomorrow!'
      );
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-2xl max-h-[92vh] overflow-y-auto border border-surface-container-high shadow-2xl flex flex-col">
        {/* Modal Handle */}
        <div className="flex flex-col items-center pt-2.5 pb-1">
          <div className="w-10 h-1 bg-surface-container-highest rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="p-4 pt-1 flex items-start justify-between border-b border-surface-container-high/40">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h2 className="font-sans font-extrabold text-base text-on-surface">Return or Exchange</h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-tertiary-container text-on-tertiary">
                Guaranteed
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant font-sans">
              Order #CVZ-09284 • Delivered 14 Mar (3 days left in 7-day window)
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Dismiss sheet"
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-tertiary-fixed text-tertiary mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">
                {requestType === 'exchange' ? 'Exchange Scheduled Successfully!' : 'Return Pickup Initiated!'}
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Delhivery courier executive has been dispatched for tomorrow between 10:00 AM - 2:00 PM. Keep your old item in the original packaging.
              </p>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Reverse AWB:</span>
                <span className="font-mono font-bold text-primary">DLH-REV-849202</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Replacement Item:</span>
                <span className="font-bold text-on-surface">{exchangeModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Inspection Time:</span>
                <span className="text-tertiary font-bold">30 seconds at doorstep</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-primary text-on-primary rounded-xl text-xs font-bold"
            >
              Back to Orders
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-4 pb-28">
            {/* Reassurance Guarantee Strip */}
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-tertiary-fixed/25 text-tertiary border border-tertiary/20">
              <span className="material-symbols-outlined text-[20px] text-tertiary shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              <div className="text-xs leading-tight font-sans flex-1">
                <span className="font-bold text-tertiary">100% Precision-Fit Guarantee</span> • Free doorstep pickup via Delhivery Express
              </div>
            </div>

            {/* Product Summary Card */}
            <div className="p-3 rounded-xl bg-surface-container-low shadow-2xs border border-surface-container-high/60 flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-lg bg-white overflow-hidden shrink-0 border border-surface-container-high/60 p-1">
                <img
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpMGLUNIYspnHOfO4MzGAFU5ZBTe8432p9UDsjXtf5zZetY1oBN29aEHHG9_Im_5QFv75vh3H1Y_fVHPsjUgwETYaOW5rf6zZ_6rxM8j5r1R9IaafOEdZDKEFpeNCsT1yBumtUNSVgiG9FuIkq0izFPLNliU1HLQFGi8eod7bJsdu77m2CUuKJrCzEmGvM6HW9-9TmG0SFl2-rH728-lueOqa2L2qbmqVlN4ApVZdLceCdbesdz42LQA"
                  alt="Tempered glass screen protector"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-start justify-between gap-1">
                  <p className="text-xs font-bold text-on-surface truncate">9H Diamond Tempered Glass</p>
                  <span className="text-xs font-extrabold text-on-surface shrink-0">₹399</span>
                </div>
                <p className="text-[11px] text-on-surface-variant truncate font-sans">Apple iPhone 15 Pro • EZ-Fit Tray Pack</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="inline-flex items-center text-[10px] font-bold text-tertiary">
                    <span className="material-symbols-outlined text-[12px] mr-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    Paid via UPI
                  </span>
                  <span className="text-outline-variant">•</span>
                  <span className="text-[10px] text-on-surface-variant">Eligible for Free Swap</span>
                </div>
              </div>
            </div>

            {/* Action Switcher Tabs (Exchange vs Return) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                Select Request Type
              </label>
              <div className="grid grid-cols-2 p-1 bg-surface-container rounded-xl gap-1">
                <button
                  onClick={() => setRequestType('exchange')}
                  className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                    requestType === 'exchange'
                      ? 'bg-surface-container-lowest shadow-xs text-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                    <span>Model Swap</span>
                  </div>
                  <span className="text-[9px] font-bold text-secondary-container mt-0.5">
                    ⚡ 2-Day Doorstep Replacement
                  </span>
                </button>

                <button
                  onClick={() => setRequestType('return')}
                  className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                    requestType === 'return'
                      ? 'bg-surface-container-lowest shadow-xs text-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">currency_rupee</span>
                    <span>Return Item</span>
                  </div>
                  <span className="text-[9px] font-medium text-on-surface-variant mt-0.5">
                    QC Pickup &amp; Refund
                  </span>
                </button>
              </div>
            </div>

            {/* Reason Selector Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  Reason For Request
                </label>
                <span className="text-[10px] font-bold text-primary">Required</span>
              </div>

              <div className="flex flex-col gap-1.5">
                {[
                  {
                    id: 'wrong_model',
                    title: 'Ordered wrong phone model / size',
                    desc: 'Switch seamlessly to another iPhone or Galaxy model',
                    icon: 'smartphone'
                  },
                  {
                    id: 'damaged',
                    title: 'Screen glass arrived cracked or scratched',
                    desc: 'Transit damage covered under free transit insurance',
                    icon: 'broken_image'
                  },
                  {
                    id: 'fit_issue',
                    title: 'Cutout misaligned with speaker or notch',
                    desc: 'Does not sit flush with case borders',
                    icon: 'aspect_ratio'
                  },
                  {
                    id: 'quality',
                    title: 'Changed mind / Quality not as expected',
                    desc: 'Unopened seal and accessories intact',
                    icon: 'sentiment_dissatisfied'
                  }
                ].map((item) => (
                  <label
                    key={item.id}
                    onClick={() => setReason(item.id)}
                    className={`flex items-center p-2.5 rounded-xl cursor-pointer transition-all border ${
                      reason === item.id
                        ? 'bg-primary-fixed/25 border-primary/30 shadow-2xs'
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center mr-2.5 shrink-0 ${
                        reason === item.id ? 'bg-primary text-on-primary' : 'border border-outline'
                      }`}
                    >
                      {reason === item.id && <span className="material-symbols-outlined text-[11px]">check</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-on-surface">{item.title}</p>
                      <p className="text-[10px] text-on-surface-variant font-sans">{item.desc}</p>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant text-[18px] ml-2">
                      {item.icon}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contextual Model Swapper (Active when Model Swap is chosen) */}
            {requestType === 'exchange' && (
              <div className="flex flex-col gap-2 p-3 rounded-xl bg-primary-fixed/30 border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">Select Correct Device</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary">
                    ₹0 Price Difference
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 p-2 rounded-lg bg-surface-container-lowest shadow-2xs border border-surface-container-high/60 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold text-on-surface-variant">Exchange With</span>
                      <span className="text-xs font-bold text-on-surface">{exchangeModel}</span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-[18px]">swap_horiz</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
                  {quickModels.map((m) => (
                    <button
                      key={m}
                      onClick={() => setExchangeModel(m)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${
                        exchangeModel === m
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                      }`}
                      type="button"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Proof of Product / Seal upload slots */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  Proof of Product / Seal
                </label>
                <span className="text-[10px] text-on-surface-variant">Optional for Model Swap</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div
                  onClick={() => handlePhotoUpload('front_glass')}
                  className={`h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-all ${
                    uploadedPhotos['front_glass']
                      ? 'border-tertiary bg-tertiary-fixed/20 text-tertiary'
                      : 'border-surface-container-high bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] mb-0.5">
                    {uploadedPhotos['front_glass'] ? 'check_circle' : 'add_a_photo'}
                  </span>
                  <span className="text-[11px] font-bold">
                    {uploadedPhotos['front_glass'] ? 'Front Photo Added' : '+ Front Glass View'}
                  </span>
                  <span className="text-[9px] opacity-75">JPG, PNG up to 10MB</span>
                </div>

                <div
                  onClick={() => handlePhotoUpload('barcode')}
                  className={`h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-all ${
                    uploadedPhotos['barcode']
                      ? 'border-tertiary bg-tertiary-fixed/20 text-tertiary'
                      : 'border-surface-container-high bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] mb-0.5">
                    {uploadedPhotos['barcode'] ? 'check_circle' : 'barcode_scanner'}
                  </span>
                  <span className="text-[11px] font-bold">
                    {uploadedPhotos['barcode'] ? 'Barcode Added' : '+ Box / Barcode'}
                  </span>
                  <span className="text-[9px] opacity-75">Assists instant approval</span>
                </div>
              </div>

              <p className="text-[10px] text-on-surface-variant leading-tight flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-tertiary">check</span>
                Our Delhivery courier executive conducts a 30-second inspection at your door.
              </p>
            </div>

            {/* Refund Settlement Section (If return mode) */}
            {requestType === 'return' && (
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  Refund Method
                </label>
                <div className="flex flex-col gap-1.5">
                  <label
                    onClick={() => setRefundMethod('coins')}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border ${
                      refundMethod === 'coins'
                        ? 'bg-primary-fixed/25 border-primary/30'
                        : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="refund"
                        checked={refundMethod === 'coins'}
                        onChange={() => setRefundMethod('coins')}
                        className="accent-primary w-4 h-4"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-on-surface">Coverzo Store Coins</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-secondary-container text-on-secondary">
                            +10% BONUS
                          </span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant">Get ₹439 Instant credit for next drop</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
                  </label>

                  <label
                    onClick={() => setRefundMethod('upi')}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border ${
                      refundMethod === 'upi'
                        ? 'bg-primary-fixed/25 border-primary/30'
                        : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="refund"
                        checked={refundMethod === 'upi'}
                        onChange={() => setRefundMethod('upi')}
                        className="accent-primary w-4 h-4"
                      />
                      <div>
                        <span className="text-xs font-bold text-on-surface">Original UPI Payment</span>
                        <p className="text-[10px] text-on-surface-variant">sharma@oksbi • 2-4 hrs post pickup</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant text-[20px]">qr_code_2</span>
                  </label>
                </div>
              </div>
            )}

            {/* Doorstep Reverse Pickup Details */}
            <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                  </div>
                  <span className="text-xs font-bold text-on-surface">Doorstep Reverse Pickup</span>
                </div>
                <button
                  onClick={() => onShowToast('Pickup address confirmed')}
                  className="text-[10px] text-primary font-bold hover:underline"
                >
                  Change
                </button>
              </div>

              <div className="p-2 rounded-lg bg-surface-container-lowest text-xs">
                <p className="font-bold text-on-surface">Flat 402, Green Glen Layout</p>
                <p className="text-[11px] text-on-surface-variant font-sans">Bellandur, Bengaluru - 560103</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">schedule</span>
                  Tomorrow, 10:00 AM – 2:00 PM
                </span>
                <span className="text-[10px] font-bold text-tertiary">Delhivery Express</span>
              </div>
            </div>

            {/* Special Instructions Assistance Link */}
            <div className="text-center py-1">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-tertiary font-bold hover:underline"
              >
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  chat
                </span>
                Special Instructions? WhatsApp Coverzo Care Support
              </a>
            </div>
          </div>
        )}

        {/* Sticky Confirmation Bar */}
        {!isSuccess && (
          <div className="sticky bottom-0 left-0 right-0 p-3 bg-surface/95 backdrop-blur-xl border-t border-surface-container-high shadow-lg z-20 space-y-2">
            <div className="flex items-center justify-between px-1 text-[11px]">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                <span className="font-bold text-on-surface">Zero Exchange Fee</span>
              </div>
              <span className="text-tertiary font-bold">Free Reverse Delhivery</span>
            </div>

            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="w-full h-12 bg-primary text-on-primary rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all hover:bg-primary/95 disabled:opacity-50"
              type="button"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  <span>Scheduling Reverse Pickup...</span>
                </>
              ) : (
                <>
                  <span>{requestType === 'exchange' ? 'Confirm Model Exchange' : 'Confirm Return & Refund'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
