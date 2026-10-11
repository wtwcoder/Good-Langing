import React from 'react';
import {
  Volume2,
  VolumeX,
  Zap,
  TrendingDown,
  ShoppingBag,
  Sparkles,
  Compass,
} from 'lucide-react';
import { ChaosStats } from '../types.ts';
import { soundManager } from '../utils/audio.ts';

interface ChaosHUDProps {
  stats: ChaosStats;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onTurboMode: () => void;
  onScrollToBottomHunt: () => void;
}

export const ChaosHUD: React.FC<ChaosHUDProps> = ({
  stats,
  soundEnabled,
  onToggleSound,
  onTurboMode,
  onScrollToBottomHunt,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6 md:gap-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            className="flex items-center gap-2 text-base md:text-lg font-black tracking-tight text-white whitespace-nowrap"
          >
            <span className="p-1 rounded-lg bg-amber-500 text-neutral-950">
              <Zap className="w-4 h-4 fill-neutral-950" />
            </span>
            <span>ХАОС-МАРКЕТ 3000</span>
          </a>
        </div>

        {/* Zone 2: Chaos Telemetry & Metrics */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-neutral-500">Глубина:</span>
            <span className="text-amber-400 font-bold tabular-nums">
              {stats.scrollDepthPx.toLocaleString('ru-RU')} px
            </span>
          </div>
          <span className="text-neutral-700">·</span>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-neutral-500">Убежало кнопок:</span>
            <span className="text-rose-400 font-bold tabular-nums">
              {stats.buttonsEvaded} раз
            </span>
          </div>
          <span className="text-neutral-700">·</span>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-neutral-500">Товаров в эфире:</span>
            <span className="text-sky-400 font-bold tabular-nums">
              {stats.productsGenerated} шт.
            </span>
          </div>
          <span className="text-neutral-700">·</span>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-neutral-500">Шанс уйти:</span>
            <span className="text-emerald-400 font-bold">0.00%</span>
          </div>
        </div>

        {/* Zone 3: Interactive Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border text-xs transition-colors flex items-center justify-center ${
              soundEnabled
                ? 'bg-neutral-900 border-neutral-700 text-amber-400 hover:bg-neutral-800'
                : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-neutral-300'
            }`}
            title={soundEnabled ? 'Звук включен' : 'Звук выключен'}
            aria-label="Переключить звук"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Try to reach bottom button */}
          <button
            onClick={onScrollToBottomHunt}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-200 transition-colors whitespace-nowrap"
            title="Попытаться долистать до конца (спойлер: невозможно)"
          >
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Найти конец</span>
          </button>

          {/* Turbo Chaos Button */}
          <button
            onClick={onTurboMode}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-neutral-950 font-black text-xs rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer active:scale-95"
            title="Добавить +5 безумных секций прямо сейчас"
          >
            <Zap className="w-3.5 h-3.5 fill-neutral-950" />
            <span>+5 СЕКЦИЙ</span>
          </button>
        </div>
      </div>
    </header>
  );
};
