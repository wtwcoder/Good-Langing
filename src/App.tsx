import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ProductOffer, ChaosStats } from './types.ts';
import { SEED_PRODUCTS } from './data/seedProducts.ts';
import { generateInfiniteProduct } from './utils/generator.ts';
import { soundManager } from './utils/audio.ts';
import { ChaosHUD } from './components/ChaosHUD.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ProductCard } from './components/ProductCard.tsx';
import { InfiniteFooter } from './components/InfiniteFooter.tsx';
import { CaughtModal } from './components/CaughtModal.tsx';
import { LiveToasts } from './components/LiveToasts.tsx';

export default function App() {
  // Initial products: start with first 6 seeds for instant fast load, rest will append as user scrolls
  const [products, setProducts] = useState<ProductOffer[]>(() =>
    SEED_PRODUCTS.slice(0, 6)
  );
  const [seedIndex, setSeedIndex] = useState(6);

  const [caughtProduct, setCaughtProduct] = useState<ProductOffer | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [stats, setStats] = useState<ChaosStats>({
    scrollDepthPx: 0,
    buttonsEvaded: 0,
    productsGenerated: 6,
    fakeCartTotal: 0,
    panicLevel: 98,
    speedMode: false,
  });

  const isAutoScrollingRef = useRef(false);

  // Append new products (either from remaining seeds or procedurally generated)
  const appendMoreProducts = useCallback((count = 2) => {
    setProducts((prev) => {
      const newItems: ProductOffer[] = [];
      let currentIdx = seedIndex;

      for (let i = 0; i < count; i++) {
        if (currentIdx < SEED_PRODUCTS.length) {
          newItems.push(SEED_PRODUCTS[currentIdx]);
          currentIdx++;
        } else {
          newItems.push(generateInfiniteProduct());
        }
      }

      setSeedIndex(currentIdx);
      return [...prev, ...newItems];
    });

    setStats((prev) => ({
      ...prev,
      productsGenerated: prev.productsGenerated + count,
      panicLevel: Math.min(100, prev.panicLevel + 1),
    }));
  }, [seedIndex]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = Math.round(window.scrollY);
      setStats((prev) => ({
        ...prev,
        scrollDepthPx: scrollY,
      }));

      // Infinite scroll trigger: when within 900px of page bottom
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollHeight - scrollY - clientHeight < 900) {
        appendMoreProducts(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [appendMoreProducts]);

  // Handle runaway button evasion
  const handleButtonDodge = () => {
    setStats((prev) => ({
      ...prev,
      buttonsEvaded: prev.buttonsEvaded + 1,
    }));
  };

  // Handle successful catch
  const handleButtonCatch = (product: ProductOffer) => {
    setCaughtProduct(product);
  };

  // Toggle sound
  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.enabled = nextState;
  };

  // Turbo mode: immediately spawn 5 products + siren sound
  const handleTurboMode = () => {
    soundManager.playTurbo();
    appendMoreProducts(5);
  };

  // Scroll to bottom hunt: fast auto-scroll down to simulate trying to reach the bottom!
  const handleScrollToBottomHunt = () => {
    if (isAutoScrollingRef.current) return;
    isAutoScrollingRef.current = true;
    soundManager.playTurbo();

    let steps = 0;
    const maxSteps = 45;
    const scrollStep = () => {
      window.scrollBy({ top: 320, behavior: 'smooth' });
      steps++;
      if (steps < maxSteps) {
        setTimeout(scrollStep, 100);
      } else {
        isAutoScrollingRef.current = false;
      }
    };
    scrollStep();
  };

  const handleStartScroll = () => {
    const firstOffer = document.getElementById(`offer-${products[0]?.id}`);
    if (firstOffer) {
      firstOffer.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 600, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-amber-400 selection:text-neutral-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sticky Telemetry & Control HUD */}
      <ChaosHUD
        stats={stats}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onTurboMode={handleTurboMode}
        onScrollToBottomHunt={handleScrollToBottomHunt}
      />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <HeroSection onStartScroll={handleStartScroll} />

        {/* Stream of Absurd Product Offer Sections */}
        <div className="w-full py-4">
          {products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onCatch={handleButtonCatch}
              onDodge={handleButtonDodge}
            />
          ))}
        </div>

        {/* The Undefeatable Infinite Footer */}
        <InfiniteFooter
          productsCount={products.length}
          onNearEnd={() => appendMoreProducts(3)}
        />
      </main>

      {/* Floating Real-Time Notifications */}
      <LiveToasts />

      {/* Catch Modal */}
      <CaughtModal
        product={caughtProduct}
        onClose={() => setCaughtProduct(null)}
      />
    </div>
  );
}
