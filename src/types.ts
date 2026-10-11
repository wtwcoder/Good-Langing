export interface Review {
  author: string;
  role: string;
  quote: string;
  rating: number;
  date: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface ProductOffer {
  id: string;
  orderNumber: number;
  name: string;
  category: string;
  tagline: string;
  description: string;
  highlightText: string;
  basePrice: number;
  currency: string;
  originalPrice: number;
  discountPercent: number;
  inStock: number;
  countdownSeconds: number;
  specs: Spec[];
  reviews: Review[];
  guaranteeText: string;
  badge: string;
  accentColor: string; // hex or tailwind color
  accentBg: string;
  accentBorder: string;
  iconName: string;
  visualGraphicType: 'quantum' | 'kettle' | 'antenna' | 'socks' | 'bubble' | 'doc' | 'blackhole' | 'glasses' | 'cat' | 'foil' | 'sandwich' | 'mystery';
  dodges: number;
  lastDodgeText?: string;
}

export interface LiveActivity {
  id: string;
  message: string;
  type: 'buy' | 'price' | 'alert' | 'quote';
  timestamp: string;
}

export interface ChaosStats {
  scrollDepthPx: number;
  buttonsEvaded: number;
  productsGenerated: number;
  fakeCartTotal: number;
  panicLevel: number;
  speedMode: boolean;
}
