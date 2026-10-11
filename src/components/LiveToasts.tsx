import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { LiveActivity } from '../types.ts';

const SAMPLE_TOASTS = [
  { message: 'Иван из Воронежа пытался поймать кнопку 34 раза и сдался.', type: 'alert' as const },
  { message: '⚡ ВНИМАНИЕ: Скидка 99% на Квантовый батон сгорит через 4 секунды!', type: 'price' as const },
  { message: 'Ольга из Казани только что купила «Справку о том, что всё можно»!', type: 'buy' as const },
  { message: 'Артём случайно нажал Enter и оформил ипотеку на носок!', type: 'buy' as const },
  { message: '🚨 Подвал сайта снова убежал на 2 000 пикселей вниз!', type: 'alert' as const },
  { message: 'Цена на Чёрную дыру поднялась на +380% из-за гравитации!', type: 'price' as const },
  { message: 'Голубь с Wi-Fi роутером сел на балкон мэра Новосибирска.', type: 'buy' as const },
];

export const LiveToasts: React.FC = () => {
  const [currentToast, setCurrentToast] = useState<LiveActivity | null>(null);

  useEffect(() => {
    const showToast = () => {
      const item = SAMPLE_TOASTS[Math.floor(Math.random() * SAMPLE_TOASTS.length)];
      setCurrentToast({
        id: String(Date.now()),
        message: item.message,
        type: item.type,
        timestamp: 'Только что',
      });

      setTimeout(() => {
        setCurrentToast(null);
      }, 4200);
    };

    const interval = setInterval(showToast, 6500);
    // Initial toast after 2s
    const timeout = setTimeout(showToast, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm pointer-events-none">
      <AnimatePresence>
        {currentToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="p-3.5 rounded-2xl bg-neutral-900/95 border border-neutral-700/80 shadow-2xl backdrop-blur-md text-xs text-neutral-200 flex items-center gap-3 pointer-events-auto"
          >
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              {currentToast.type === 'buy' && <ShoppingCart className="w-4 h-4" />}
              {currentToast.type === 'price' && <TrendingUp className="w-4 h-4" />}
              {currentToast.type === 'alert' && <AlertTriangle className="w-4 h-4" />}
            </div>
            <div className="flex-1">
              <span className="font-medium leading-snug block">
                {currentToast.message}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono mt-0.5 block">
                Живая активность · {currentToast.timestamp}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
