import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown, Zap, AlertTriangle } from 'lucide-react';
import { soundManager } from '../utils/audio.ts';

interface PriceTickerProps {
  initialPrice: number;
  initialOriginal: number;
  currency: string;
}

export const PriceTicker: React.FC<PriceTickerProps> = ({
  initialPrice,
  initialOriginal,
  currency = '₽',
}) => {
  const [price, setPrice] = useState<number | string>(initialPrice);
  const [originalPrice, setOriginalPrice] = useState<number>(initialOriginal);
  const [direction, setDirection] = useState<'up' | 'down' | 'glitch'>('down');
  const [flashColor, setFlashColor] = useState<'green' | 'red' | 'yellow' | null>(null);
  const [changePercent, setChangePercent] = useState<number>(-92);

  useEffect(() => {
    // Dynamic price jump interval between 2.2 and 4.5 seconds per product
    const intervalTime = 2200 + Math.random() * 2300;

    const timer = setInterval(() => {
      const mode = Math.random();

      if (mode < 0.15) {
        // Absurd special text prices
        const absurdText = [
          'БЕСЦЕННО',
          '-500 ₽ (ДОПЛАТИМ)',
          '0.00042 ₿',
          '3 ШОКОЛАДКИ',
          '1 РУБЛЬ',
        ][Math.floor(Math.random() * 5)];
        setPrice(absurdText);
        setDirection('glitch');
        setFlashColor('yellow');
        setChangePercent(-99.9);
      } else if (mode < 0.55) {
        // Price drops massively!
        const dropFactor = 0.2 + Math.random() * 0.5;
        const newPrice = Math.max(12, Math.round(initialPrice * dropFactor));
        setPrice(newPrice);
        setDirection('down');
        setFlashColor('green');
        const pct = -Math.round((1 - newPrice / originalPrice) * 100);
        setChangePercent(pct);
      } else {
        // Sudden hyperinflation!
        const hikeFactor = 1.5 + Math.random() * 3.2;
        const newPrice = Math.round(initialPrice * hikeFactor);
        setPrice(newPrice);
        setDirection('up');
        setFlashColor('red');
        const pct = Math.round(((newPrice - initialPrice) / initialPrice) * 100);
        setChangePercent(pct);
      }

      soundManager.playGlitchTick();

      // Reset flash color after 400ms
      setTimeout(() => {
        setFlashColor(null);
      }, 500);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [initialPrice, originalPrice]);

  return (
    <div className="flex flex-col gap-1.5 font-mono">
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-neutral-400">
          Текущий курс:
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={`${direction}-${changePercent}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded ${
              direction === 'up'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : direction === 'down'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}
          >
            {direction === 'up' && <TrendingUp className="w-3 h-3" />}
            {direction === 'down' && <TrendingDown className="w-3 h-3" />}
            {direction === 'glitch' && <Zap className="w-3 h-3" />}
            <span>
              {direction === 'up' ? `+${changePercent}% ВСПЛЕСК!` : `${changePercent}% СКИДКА`}
            </span>
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex items-baseline gap-3 flex-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={String(price)}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`text-3xl md:text-4xl font-black tabular-nums transition-colors duration-300 ${
              flashColor === 'green'
                ? 'text-emerald-400'
                : flashColor === 'red'
                ? 'text-rose-500'
                : flashColor === 'yellow'
                ? 'text-amber-300'
                : 'text-neutral-100'
            }`}
          >
            {typeof price === 'number' ? `${price.toLocaleString('ru-RU')} ${currency}` : price}
          </motion.div>
        </AnimatePresence>

        <span className="text-sm md:text-base text-neutral-500 line-through tabular-nums decoration-rose-500/70 decoration-2">
          {originalPrice.toLocaleString('ru-RU')} {currency}
        </span>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-amber-400/90 font-sans">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
        <span className="animate-pulse">
          Цена пересчитывается в реальном времени каждые 3 секунды!
        </span>
      </div>
    </div>
  );
};
