import React from 'react';
import { motion } from 'motion/react';
import { Flame, ArrowDown, Sparkles, ShieldAlert, Zap, MousePointerClick } from 'lucide-react';

interface HeroSectionProps {
  onStartScroll: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartScroll }) => {
  return (
    <div className="relative w-full pt-10 pb-16 overflow-hidden border-b border-neutral-800">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[250px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Marquee Ticker 1 */}
      <div className="w-full overflow-hidden bg-amber-500/10 border-y border-amber-500/20 py-2 mb-8">
        <div className="animate-marquee whitespace-nowrap flex gap-8 text-xs font-mono font-bold text-amber-400">
          <span>⚡ ВНИМАНИЕ: ТОТАЛЬНАЯ ЛИКВИДАЦИЯ ЗДРАВОГО СМЫСЛА</span>
          <span>·</span>
          <span>🔥 СКИДКИ ДО 146% ПРЯМО СЕЙЧАС</span>
          <span>·</span>
          <span>🛑 ПОДВАЛ САЙТА ОФИЦИАЛЬНО НЕ СУЩЕСТВУЕТ</span>
          <span>·</span>
          <span>🏃 КНОПКИ «КУПИТЬ» БЫСТРЕЕ ВАШЕГО КУРСОРА</span>
          <span>·</span>
          <span>⚡ ВНИМАНИЕ: ТОТАЛЬНАЯ ЛИКВИДАЦИЯ ЗДРАВОГО СМЫСЛА</span>
          <span>·</span>
          <span>🔥 СКИДКИ ДО 146% ПРЯМО СЕЙЧАС</span>
          <span>·</span>
          <span>🛑 ПОДВАЛ САЙТА ОФИЦИАЛЬНО НЕ СУЩЕСТВУЕТ</span>
          <span>·</span>
          <span>🏃 КНОПКИ «КУПИТЬ» БЫСТРЕЕ ВАШЕГО КУРСОРА</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        {/* Satirical Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="font-semibold text-rose-400">ХАОС-РЕЖИМ: АКТИВИРОВАН</span>
          <span className="text-neutral-500">/</span>
          <span>БЕСКОНЕЧНАЯ ГЕНЕРАЦИЯ</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
          ЛЕНДИНГ, КОТОРЫЙ{' '}
          <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 bg-clip-text text-transparent underline decoration-amber-500/40 decoration-wavy">
            НИКОГДА НЕ КОНЧИТСЯ
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Добро пожаловать в гипермаркет тотального абсурда. Здесь продаются квантовые буханки,
          роутеры для голубей и справки на право делать что угодно. Кнопки покупки убегают от мыши,
          цены скачут каждые 3 секунды, а при скролле вниз сайт разрастается до бесконечности!
        </p>

        {/* 3 Pillars of Chaos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
            <div className="p-2 w-fit rounded-xl bg-amber-500/20 text-amber-400 mb-3">
              <MousePointerClick className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Убегающие кнопки</h3>
            <p className="text-xs text-neutral-400 mt-1 leading-normal">
              Кнопки «Купить» чувствуют приближение курсора и молниеносно уворачиваются с дразнящими фразами.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
            <div className="p-2 w-fit rounded-xl bg-rose-500/20 text-rose-400 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Скачущие цены</h3>
            <p className="text-xs text-neutral-400 mt-1 leading-normal">
              Цены пересчитываются на лету: от внезапных 99% скидок до астрономической гиперсверхприбыли.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
            <div className="p-2 w-fit rounded-xl bg-sky-500/20 text-sky-400 mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Бесконечный скролл</h3>
            <p className="text-xs text-neutral-400 mt-1 leading-normal">
              При приближении к концу страницы моментально генерируются новые абсурдные товары. Дойти до дна невозможно!
            </p>
          </div>
        </div>

        {/* Scroll Action Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onStartScroll}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>ОКУНУТЬСЯ В ХАОС</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
          <span className="text-xs font-mono text-neutral-500">
            ↓ Листайте вниз, если осмелитесь ↓
          </span>
        </div>
      </div>

      {/* Marquee Ticker 2 Reverse */}
      <div className="w-full overflow-hidden bg-rose-500/10 border-y border-rose-500/20 py-2 mt-12">
        <div className="animate-marquee-reverse whitespace-nowrap flex gap-8 text-xs font-mono font-bold text-rose-400">
          <span>⚠️ КВАНТОВЫЙ БАТОН ШРЁДИНГЕРА В НАЛИЧИИ</span>
          <span>·</span>
          <span>🕊️ ГОЛУБИНЫЙ WI-FI 6G ВЫДАЁТ 120 МБИТ/СЕК</span>
          <span>·</span>
          <span>🧦 ПОТЕРЯННЫЙ НОСОК НАЙДЕН В 4-М ИЗМЕРЕНИИ</span>
          <span>·</span>
          <span>☕ ТЕЛЕПАТИЧЕСКИЙ ЧАЙНИК УЖЕ ЗНАЕТ, ЧТО ВЫ ХОТИТЕ ПИТЬ</span>
          <span>·</span>
          <span>⚠️ КВАНТОВЫЙ БАТОН ШРЁДИНГЕРА В НАЛИЧИИ</span>
          <span>·</span>
          <span>🕊️ ГОЛУБИНЫЙ WI-FI 6G ВЫДАЁТ 120 МБИТ/СЕК</span>
          <span>·</span>
          <span>🧦 ПОТЕРЯННЫЙ НОСОК НАЙДЕН В 4-М ИЗМЕРЕНИИ</span>
          <span>·</span>
          <span>☕ ТЕЛЕПАТИЧЕСКИЙ ЧАЙНИК УЖЕ ЗНАЕТ, ЧТО ВЫ ХОТИТЕ ПИТЬ</span>
        </div>
      </div>
    </div>
  );
};
