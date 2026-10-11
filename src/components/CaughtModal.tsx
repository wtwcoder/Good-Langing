import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X, ShieldAlert, Sparkles, Check, ArrowRight, HeartHandshake } from 'lucide-react';
import { ProductOffer } from '../types.ts';

interface CaughtModalProps {
  product: ProductOffer | null;
  onClose: () => void;
}

export const CaughtModal: React.FC<CaughtModalProps> = ({ product, onClose }) => {
  const [step, setStep] = useState<'victory' | 'checkout' | 'success'>('victory');
  const [guaranteeChecked, setGuaranteeChecked] = useState(false);

  useEffect(() => {
    if (product) {
      setStep('victory');
      setGuaranteeChecked(false);
      // Trigger festive confetti cannons
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ef4444', '#10b981', '#38bdf8', '#a855f7'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-xl bg-neutral-900 border-2 border-amber-500/80 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.3)] text-neutral-100 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
          title="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'victory' && (
          <div className="text-center space-y-5">
            <div className="inline-flex p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Trophy className="w-12 h-12 animate-bounce" />
            </div>

            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-bold">
                ВЕЛИЧАЙШИЙ ПОДВИГ В ИСТОРИИ ИНТЕРНЕТА
              </span>
              <h3 className="text-2xl md:text-3xl font-black mt-2 text-white">
                ВЫ СМОГЛИ ПОЙМАТЬ КНОПКУ! 🎯
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-sm text-neutral-300 leading-relaxed text-left space-y-2">
              <p>
                Вы перехитрили квантовые алгоритмы уклонения и поймали товар:{' '}
                <strong className="text-amber-300">{product.name}</strong>.
              </p>
              <p className="text-xs text-neutral-400 border-t border-neutral-800 pt-2 font-mono">
                ⚠️ Однако пока палец опускался на клавишу, товар уже подорожал на 840%, курьер
                уволился и стал буддийским монахом, а склад перевезли на спутник Юпитера.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setStep('checkout')}
                className="flex-1 py-3 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>ОФОРМИТЬ В ИПОТЕКУ НА 50 ЛЕТ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="py-3 px-6 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold rounded-xl text-sm transition-colors"
              >
                Отпустить кнопку на волю
              </button>
            </div>
          </div>
        )}

        {step === 'checkout' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Блиц-оформление абсурдной покупки
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Цвет вашей астральной ауры:</label>
                <input
                  type="text"
                  defaultValue="Мерцающий ультрамарин с крапинками кофе"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">
                  Номер карты вашего самого богатого родственника:
                </label>
                <input
                  type="text"
                  placeholder="2200 •••• •••• 9999 (или честное пионерское)"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:border-amber-400 outline-none font-mono"
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={guaranteeChecked}
                  onChange={(e) => setGuaranteeChecked(e.target.checked)}
                  className="mt-0.5 accent-amber-500 rounded"
                />
                <label htmlFor="agree" className="text-neutral-400 text-[11px] leading-tight select-none">
                  Я согласен любить этот товар вечно и никогда не требовать возврата денег даже через Вселенский трибунал.
                </label>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                disabled={!guaranteeChecked}
                onClick={() => {
                  setStep('success');
                  try {
                    confetti({ particleCount: 80, spread: 60 });
                  } catch {}
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                  guaranteeChecked
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                ПОДТВЕРДИТЬ СДЕЛКУ ВЕКА
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-4 py-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400">
              <HeartHandshake className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">ПОЗДРАВЛЯЕМ! ЗАКУПЛЕНО!</h3>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-md mx-auto">
              Ваш заказ передан межгалактическим курьерам. Ожидайте доставку в любой момент между
              сегодняшним вечером и тепловой смертью Вселенной. Спасибо за покупку в ХаосМаркет 3000!
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-xs"
            >
              Вернуться к бесконечному скроллу
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
