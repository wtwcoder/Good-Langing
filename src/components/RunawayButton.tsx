import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Flame, ShieldAlert, Sparkles, Smile } from 'lucide-react';
import { soundManager } from '../utils/audio.ts';
import { ProductOffer } from '../types.ts';

interface RunawayButtonProps {
  product: ProductOffer;
  onCatch: (product: ProductOffer) => void;
  onDodge: () => void;
}

const TAUNTS = [
  'Мимо! 😜',
  'Не поймаешь! 🏃💨',
  'Ха-ха, левее! 👀',
  'Слишком медленно! 🐌',
  'Лови, если сможешь! ⚡',
  'Почти! Попробуй еще! 🎯',
  'Я быстрее твоего курсора! 🚀',
  'Упс, ускользнул! 🧼',
  'Цена выросла, пока ты целился! 📈',
  'Ахаха, нет! 🙅‍♂️',
  'Жми на другой товар! 🙃',
];

export const RunawayButton: React.FC<RunawayButtonProps> = ({
  product,
  onCatch,
  onDodge,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [currentTaunt, setCurrentTaunt] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const tauntTimeoutRef = useRef<number | null>(null);

  const triggerDodge = (cursorX: number, cursorY: number) => {
    if (!buttonRef.current || !containerRef.current) return;

    const btnRect = buttonRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const deltaX = btnCenterX - cursorX;
    const deltaY = btnCenterY - cursorY;
    const distance = Math.hypot(deltaX, deltaY);

    // If cursor is within 110px of button
    if (distance < 110) {
      soundManager.playDodge();
      onDodge();
      setDodgeCount((prev) => prev + 1);

      // Pick a random taunt
      const randomTaunt = TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
      setCurrentTaunt(randomTaunt);

      if (tauntTimeoutRef.current) {
        window.clearTimeout(tauntTimeoutRef.current);
      }
      tauntTimeoutRef.current = window.setTimeout(() => {
        setCurrentTaunt(null);
      }, 1600);

      // Repulsion calculation: move away from cursor with random chaotic jitter
      const angle = Math.atan2(deltaY, deltaX);
      const jumpDistance = 140 + Math.random() * 80;

      let newX = position.x + Math.cos(angle) * jumpDistance + (Math.random() - 0.5) * 60;
      let newY = position.y + Math.sin(angle) * jumpDistance + (Math.random() - 0.5) * 40;

      // Bound within reasonable container area (relative to center)
      const maxX = (containerRect.width / 2) - 80;
      const maxY = 90;

      if (Math.abs(newX) > maxX || Math.abs(newY) > maxY) {
        // If it hits walls, leap to the other side!
        newX = -newX * 0.7;
        newY = -newY * 0.7;
      }

      setPosition({ x: newX, y: newY });
    }
  };

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    triggerDodge(e.clientX, e.clientY);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    soundManager.playCatchSuccess();
    onCatch(product);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      soundManager.playCatchSuccess();
      onCatch(product);
    }
  };

  useEffect(() => {
    return () => {
      if (tauntTimeoutRef.current) {
        window.clearTimeout(tauntTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleContainerMouseMove}
      className="relative w-full min-h-[140px] flex items-center justify-center p-4 bg-neutral-900/60 rounded-xl border border-dashed border-neutral-700/60 overflow-hidden select-none"
    >
      {/* Background hint and dodge tracker */}
      <div className="absolute top-2 left-3 flex items-center gap-2 text-xs text-neutral-400">
        <span className="flex items-center gap-1 font-mono text-[11px] text-amber-400">
          <ShieldAlert className="w-3.5 h-3.5" />
          Уклонений кнопки: {dodgeCount}
        </span>
      </div>

      <div className="absolute bottom-2 right-3 text-[11px] text-neutral-500 font-mono">
        (Кнопка пуглива: попробуй поймать)
      </div>

      {/* The Runaway Button itself */}
      <motion.div
        animate={{
          x: position.x,
          y: position.y,
          rotate: position.x * 0.05,
        }}
        transition={{
          type: 'spring',
          damping: 14,
          stiffness: 160,
        }}
        className="relative z-10"
      >
        {/* Taunt Speech Bubble */}
        <AnimatePresence>
          {currentTaunt && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -42, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-full whitespace-nowrap pointer-events-none z-20"
            >
              <div className="px-3 py-1 bg-red-600 text-white font-bold text-xs rounded-lg shadow-lg border border-red-400 flex items-center gap-1">
                <span>{currentTaunt}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          onKeyDown={handleKeyDown}
          onMouseEnter={(e) => {
            setIsHovered(true);
            triggerDodge(e.clientX, e.clientY);
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative px-6 py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 bg-[length:200%_auto] hover:bg-right font-black text-sm md:text-base text-neutral-950 uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.4)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-amber-300"
          style={{ willChange: 'transform' }}
          title="Попробуйте кликнуть!"
        >
          <ShoppingCart className="w-5 h-5 text-neutral-950 group-hover:scale-110 transition-transform" />
          <span>КУПИТЬ СЕЙЧАС</span>
          <Flame className="w-4 h-4 text-neutral-950 animate-bounce" />
        </button>
      </motion.div>
    </div>
  );
};
