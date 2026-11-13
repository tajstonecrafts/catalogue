export type Category =
  | 'all'
  | 'coasters'
  | 'trays'
  | 'bowls'
  | 'lamps'
  | 'kitchen'
  | 'bathroom'
  | 'office'
  | 'gifting'
  | 'personalized'
  | 'artifacts';

export interface Product {
  id: string;
  name: string;
  category: Category;
  priceINR: number;
  priceUSD: number;
  originalPriceINR?: number;
  rating: number;
  reviewsCount: number;
  stoneType: string;
  inlayWork?: string;
  dimensions: string;
  weight: string;
  shortDesc: string;
  description: string;
  features: string[];
  careInstructions: string;
  isPersonalizable?: boolean;
  personalizationType?: string;
  badge?: string;
  inStock: boolean;
  imageUrl?: string;
  svgType:
    | 'coaster_hex'
    | 'tray_brass'
    | 'bowl_lotus'
    | 'lamp_jali'
    | 'mortar_pestle'
    | 'bath_set'
    | 'desk_organizer'
    | 'gift_hamper'
    | 'inlay_plate'
    | 'marble_elephant'
    | 'rolling_pin'
    | 'soap_dispenser';
}

export interface CartItem {
  product: Product;
  quantity: number;
  personalizationNote?: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  };
  paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking' | 'whatsapp';
  items: CartItem[];
  subtotalINR: number;
  subtotalUSD: number;
  shippingFeeINR: number;
  shippingFeeUSD: number;
  totalINR: number;
  totalUSD: number;
  specialInstructions?: string;
}
