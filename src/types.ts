export interface Product {
  id: string;
  name: string;
  tagline: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  badgeColor?: 'primary' | 'secondary' | 'tertiary';
  images: string[];
  colors: { name: string; hex: string; inStock: boolean }[];
  compatibleModels: string[];
  category: 'magsafe' | 'matte' | 'clear' | 'glass' | 'leather' | 'armor';
  description: string;
  features: { icon: string; title: string; desc: string }[];
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedModel: string;
  quantity: number;
}

export interface DeviceModel {
  id: string;
  name: string;
  brand: string;
  displaySize: string;
  highlight: string;
  caseCount: number;
  series: string;
  isPopular?: boolean;
}

export interface OrderTrackingStep {
  title: string;
  desc: string;
  time: string;
  completed: boolean;
  active?: boolean;
  icon: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productName: string;
    variant: string;
    model: string;
    quantity: number;
    price: number;
    originalPrice: number;
    image: string;
    returnEligible?: boolean;
    returnDaysRemaining?: number;
  }[];
  totalAmount: number;
  status: 'In Transit' | 'Delivered' | 'Confirmed' | 'Packed' | 'Shipped';
  paymentMethod: string;
  awb?: string;
  courier?: string;
  expectedDelivery?: string;
  steps?: OrderTrackingStep[];
}

export interface OpsMetrics {
  grossRevenue: number;
  revenueChangePercent: number;
  ordersPlaced: number;
  upiOrders: number;
  codOrders: number;
  netMarginPercent: number;
  profitAmount: number;
  toDispatchCount: number;
  liveShoppers: number;
}
