import React from 'react';
import { motion } from 'motion/react';
import { ProductOffer } from '../types.ts';

interface ProductVisualProps {
  type: ProductOffer['visualGraphicType'];
  accentColor: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ type, accentColor }) => {
  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center overflow-hidden group">
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-35"
        style={{
          background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Grid pattern backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />

      {/* Specific Animated SVG Visual based on Type */}
      {type === 'quantum' && (
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            animate={{ y: [-6, 6, -6], rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Holographic Loaf */}
            <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
              <path
                d="M30 70C20 60 25 35 60 25C95 15 130 20 150 40C165 55 160 80 140 90C110 105 50 100 30 70Z"
                fill="url(#breadGrad)"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
              <path d="M55 40C65 55 60 75 55 85" stroke="#7dd3fc" strokeWidth="2" opacity="0.6" />
              <path d="M85 32C95 50 90 75 85 88" stroke="#7dd3fc" strokeWidth="2" opacity="0.6" />
              <path d="M115 35C125 52 120 74 115 85" stroke="#7dd3fc" strokeWidth="2" opacity="0.6" />
              <defs>
                <linearGradient id="breadGrad" x1="20" y1="20" x2="160" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop stopColor="#0369a1" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
            {/* Orbiting Quantum Particle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 border border-cyan-400/40 rounded-full pointer-events-none"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]" />
            </motion.div>
          </motion.div>
          <span className="mt-3 text-xs font-mono text-cyan-300 uppercase tracking-widest">
            Ψ = 0.707|Свежий⟩ + 0.707|Сухарь⟩
          </span>
        </div>
      )}

      {type === 'doc' && (
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-48 h-56 bg-amber-50/10 border-2 border-amber-400/50 rounded-lg p-3 shadow-2xl relative flex flex-col justify-between"
          >
            <div className="flex items-center justify-between border-b border-amber-400/30 pb-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">СЕРИЯ № 00-ВСЁ-МОЖНО</span>
              <div className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
            <div className="space-y-1.5 opacity-60">
              <div className="h-1 bg-amber-400/40 rounded w-full" />
              <div className="h-1 bg-amber-400/40 rounded w-4/5" />
              <div className="h-1 bg-amber-400/40 rounded w-5/6" />
              <div className="h-1 bg-amber-400/40 rounded w-2/3" />
            </div>
            {/* Official Potato Stamp */}
            <div className="self-end transform rotate-[-12deg] border-2 border-dashed border-rose-500 rounded-full px-2 py-1 text-[9px] font-black text-rose-400 uppercase bg-rose-500/10">
              ★ РАЗРЕШЕНО ★
            </div>
          </motion.div>
          <span className="mt-3 text-xs font-mono text-amber-300">ПЕЧАТЬ ИЗ КАРТОШКИ ВАЛИДНА</span>
        </div>
      )}

      {type === 'socks' && (
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="w-36 h-36 rounded-full border-2 border-dashed border-purple-500/50 flex items-center justify-center relative"
          >
            <div className="w-24 h-24 rounded-full bg-purple-900/40 blur-md" />
            <motion.div
              animate={{ rotate: -360, scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-4xl absolute"
            >
              🧦
            </motion.div>
          </motion.div>
          <span className="mt-3 text-xs font-mono text-purple-300">КРОТОВАЯ НОРА «INDESIT 2018»</span>
        </div>
      )}

      {type === 'antenna' && (
        <div className="relative flex flex-col items-center justify-center">
          <div className="text-6xl relative">
            🕊️
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.3, 0.9] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-3 -right-2 text-2xl text-emerald-400"
            >
              📡
            </motion.div>
          </div>
          <div className="flex gap-1 mt-3">
            <span className="w-1.5 h-3 bg-emerald-400 rounded-sm animate-pulse" />
            <span className="w-1.5 h-4 bg-emerald-400 rounded-sm animate-pulse delay-75" />
            <span className="w-1.5 h-5 bg-emerald-400 rounded-sm animate-pulse delay-150" />
            <span className="w-1.5 h-6 bg-emerald-400 rounded-sm animate-pulse delay-200" />
          </div>
          <span className="mt-2 text-xs font-mono text-emerald-300">BIRD-WIFI: 6G ПОДКЛЮЧЕНО</span>
        </div>
      )}

      {type === 'bubble' && (
        <div className="relative flex flex-col items-center justify-center">
          <div className="grid grid-cols-4 gap-2.5 p-4 bg-rose-950/20 rounded-xl border border-rose-500/30">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1 + (i % 3) * 0.4, repeat: Infinity }}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500/30 to-pink-300/40 border border-rose-400/60 shadow-[0_0_10px_rgba(244,63,94,0.3)] flex items-center justify-center text-[10px] text-rose-200 font-mono font-bold"
              >
                POP!
              </motion.div>
            ))}
          </div>
          <span className="mt-3 text-xs font-mono text-rose-300">САМОРЕГЕНЕРАЦИЯ: 100%</span>
        </div>
      )}

      {type === 'kettle' && (
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl relative"
          >
            🫖
            <motion.div
              animate={{ opacity: [0.3, 0.9, 0.3], y: [-5, -15, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 right-0 text-xl text-cyan-300"
            >
              💭
            </motion.div>
          </motion.div>
          <span className="mt-3 text-xs font-mono text-cyan-300">НЕЙРОСЕТЬ СЛУШАЕТ ВАШИ ЖАЖДЫ</span>
        </div>
      )}

      {type === 'blackhole' && (
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="w-32 h-32 rounded-full border-4 border-dashed border-pink-500 flex items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.5)] bg-black"
          >
            <div className="w-16 h-16 rounded-full bg-black shadow-inner" />
          </motion.div>
          <span className="mt-3 text-xs font-mono text-pink-300">ГОРИЗОНТ СОБЫТИЙ СТЫДА</span>
        </div>
      )}

      {type === 'glasses' && (
        <div className="relative flex flex-col items-center justify-center">
          <div className="text-6xl">👓</div>
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-2 text-3xl"
          >
            🐹❤️✨
          </motion.div>
          <span className="mt-2 text-xs font-mono text-yellow-300">ТОКСИЧНОСТЬ = 0%</span>
        </div>
      )}

      {type === 'cat' && (
        <div className="relative flex flex-col items-center justify-center">
          <div className="text-6xl">🐱⚖️</div>
          <span className="mt-3 text-xs font-mono text-violet-300">ИСК О ВЫДАЧЕ ПАШТЕТА</span>
        </div>
      )}

      {type === 'foil' && (
        <div className="relative flex flex-col items-center justify-center">
          <div className="text-6xl">🎩⚡</div>
          <div className="text-sm font-mono text-sky-400 mt-2">5G BLOCKED // JAZZ ON 🎷</div>
        </div>
      )}

      {type === 'sandwich' && (
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl"
          >
            🥪✨
          </motion.div>
          <div className="w-24 h-1.5 bg-neutral-700/60 rounded-full mt-3 blur-[1px]" />
          <span className="mt-2 text-xs font-mono text-orange-300">ЛЕВИТАЦИЯ: 5 СМ НАД КОВРОМ</span>
        </div>
      )}

      {type === 'mystery' && (
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="text-6xl"
          >
            📦✨
          </motion.div>
          <span className="mt-3 text-xs font-mono text-neutral-300">СЕКРЕТНАЯ РАЗРАБОТКА ХАОСА</span>
        </div>
      )}
    </div>
  );
};
