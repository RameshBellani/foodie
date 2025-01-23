export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    role: 'user' | 'admin';
    addresses: Address[];
  }
  
  export interface Address {
    id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  }
  
  // In your types/index.ts
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  rating: number;
  reviews?: string[]; // Make reviews optional
}

  
  export interface Review {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }
  
  export interface CartItem {
    menuItem: MenuItem;
    quantity: number;
  }
  
  export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    status: OrderStatus;
    total: number;
    address: Address;
    paymentMethod: PaymentMethod;
    createdAt: Date;
  }
  
  export type OrderStatus = 
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'ready'
    | 'delivering'
    | 'delivered'
    | 'cancelled';
  
  export type PaymentMethod = 
    | 'card'
    | 'upi'
    | 'wallet'
    | 'cash';