import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AlertOctagon, RefreshCw, Flame, ArrowDown, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio.ts';

interface InfiniteFooterProps {
  onNearEnd: () => void;
  productsCount: number;
}

export const InfiniteFooter: React.FC<InfiniteFooterProps> = ({ onNearEnd, productsCount }) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [escapeCount, setEscapeCount] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Detected attempt to reach footer! Push footer down by appending new sections
          setEscapeCount((prev) => prev + 1);
          soundManager.playGlitchTick();
          onNearEnd();
        }
      },
      { rootMargin: '600px' }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [onNearEnd]);

  return (
    <footer
      ref={footerRef}
      className="relative w-full max-w-5xl mx-auto my-16 px-4 text-center select-none"
    >
      <div className="p-8 rounded-3xl bg-neutral-900/60 border-2 border-dashed border-amber-500/40 relative overflow-hidden backdrop-blur-sm">
        {/* Animated Warning Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-rose-500/5 pointer-events-none" />

        <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-400 mb-4 animate-bounce">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <h3 className="text-xl md:text-2xl font-black text-neutral-100 uppercase tracking-tight">
          🛑 ПОПЫТКА ДОСТИЧЬ ПОДВАЛА САЙТА ПРЕСЕЧЕНА!
        </h3>

        <p className="mt-2 text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Вы думали, что этот сайт можно долистать до конца? Наивный покупатель!
          Мы только что добавили ещё пачку эксклюзивных товаров! Подвал отодвинулся уже {escapeCount} раз.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300">
            📦 Всего товаров на лендинге: <strong className="text-amber-400">{productsCount}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-rose-400 font-bold">
            🚨 Попыток побега: <strong className="text-rose-300">{escapeCount}</strong>
          </span>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-300">ХАОС-МАРКЕТ 3000</span>
            <span>· Все права отобраны у здравого смысла · 2026–∞</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => {
                soundManager.playDodge();
                onNearEnd();
              }}
              className="text-amber-400/80 hover:text-amber-300 hover:underline transition-colors"
            >
              Политика вечного скролла
            </button>
            <span>·</span>
            <button
              onClick={() => {
                soundManager.playDodge();
                onNearEnd();
              }}
              className="text-amber-400/80 hover:text-amber-300 hover:underline transition-colors"
            >
              Пожаловаться в космос
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-neutral-500 text-xs">
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
          <span>Листайте ниже, там еще больше безумия...</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
        </div>
      </div>
    </footer>
  );
};
