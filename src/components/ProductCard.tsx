import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  Package,
  ShieldCheck,
  Star,
  Users,
  Flame,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { ProductOffer } from '../types.ts';
import { RunawayButton } from './RunawayButton.tsx';
import { PriceTicker } from './PriceTicker.tsx';
import { ProductVisual } from './ProductVisual.tsx';

interface ProductCardProps {
  product: ProductOffer;
  index: number;
  onCatch: (product: ProductOffer) => void;
  onDodge: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onCatch,
  onDodge,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(product.countdownSeconds);
  const [liveViewers, setLiveViewers] = useState(
    1400 + Math.floor(Math.random() * 3200)
  );
  const [stockCount, setStockCount] = useState(product.inStock);

  // Countdown timer that jumps or restarts absurdly
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Instead of expiring, it restarts with extra chaotic seconds!
          return Math.floor(Math.random() * 45) + 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Viewer fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers((prev) =>
        Math.max(450, prev + (Math.floor(Math.random() * 19) - 9))
      );
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id={`offer-${product.id}`}
      className="relative w-full max-w-5xl mx-auto my-12 px-4 scroll-mt-24"
    >
      {/* Decorative Outer Border & Background */}
      <div className="relative rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-2xl p-6 md:p-10 backdrop-blur-md overflow-hidden transition-all hover:border-neutral-700">
        {/* Accent Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-15"
          style={{ backgroundColor: product.accentColor }}
        />

        {/* Section Index & Category Unboxed Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-800/80 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-neutral-200">
              ПРЕДЛОЖЕНИЕ #{String(product.orderNumber).padStart(2, '0')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="uppercase tracking-wider text-neutral-400 font-medium">
              {product.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              {product.badge}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <span className="tabular-nums">{liveViewers.toLocaleString('ru-RU')}</span> смотрят
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <Package className="w-3.5 h-3.5" />
              Осталось: <span className="tabular-nums">{stockCount}</span> шт.
            </span>
          </div>
        </div>

        {/* Two-Column Grid: Visual & Sales Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
          {/* Visual Showcase (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <ProductVisual
              type={product.visualGraphicType}
              accentColor={product.accentColor}
            />

            {/* Absurd Urgency Banner */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                <span>До сброса супер-цены:</span>
              </div>
              <span className="font-mono font-bold text-amber-200 tabular-nums text-sm bg-neutral-900/80 px-2 py-0.5 rounded border border-amber-500/30">
                00:{String(secondsLeft).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Marketing Copy, Specs, & Runaway CTA (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-100 tracking-tight leading-snug">
                {product.name}
              </h2>
              <p className="mt-2 text-sm md:text-base font-medium text-amber-400/90 leading-relaxed">
                «{product.tagline}»
              </p>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Absurd Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
              {product.specs.map((spec, sIdx) => (
                <div key={sIdx} className="flex flex-col text-xs">
                  <span className="text-neutral-500 font-sans">{spec.label}</span>
                  <span className="text-neutral-200 font-mono font-semibold mt-0.5">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Dynamic Price Ticker */}
            <PriceTicker
              initialPrice={product.basePrice}
              initialOriginal={product.originalPrice}
              currency={product.currency}
            />

            {/* RUNAWAY PURCHASE BUTTON ARENA */}
            <div className="pt-2">
              <RunawayButton
                product={product}
                onCatch={onCatch}
                onDodge={onDodge}
              />
            </div>
          </div>
        </div>

        {/* Guarantee & Testimonial Footer Section */}
        <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Guarantee */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950/40 border border-neutral-800/60">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-neutral-200 block">
                Железобетонная гарантия абсурда:
              </span>
              <span className="text-neutral-400 mt-0.5 block leading-normal">
                {product.guaranteeText}
              </span>
            </div>
          </div>

          {/* Customer Review */}
          {product.reviews.length > 0 && (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950/40 border border-neutral-800/60">
              <div className="flex text-amber-400 shrink-0 mt-0.5">
                {Array.from({ length: 5 }).map((_, rIdx) => (
                  <Star key={rIdx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div>
                <span className="text-neutral-300 italic block leading-normal">
                  «{product.reviews[0].quote}»
                </span>
                <span className="text-neutral-500 font-mono text-[11px] mt-1 block">
                  — {product.reviews[0].author}, {product.reviews[0].role} ({product.reviews[0].date})
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
