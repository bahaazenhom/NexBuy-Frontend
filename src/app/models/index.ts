export interface Product {
  _id: string;
  title: string;
  desc?: string;
  price: number;
  images?: ProductImage[];
  specs?: { [key: string]: string | number };
  createdBy?: User | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female';
  cart?: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product | string;
  quantity: number;
  _id?: string;
}

export interface Comment {
  _id: string;
  content: string;
  rate: number;
  productId: string | Product;
  userId: string | User;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  _id: string;
  user: string | User;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  shippingAddress: ShippingAddress;
  placedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  product: Product | string;
  quantity: number;
  priceAtPurchase: number;
}

export interface ShippingAddress {
  fullname: string;
  line: string;
  city: string;
  country: string;
}

// API Response Types
export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: 'male' | 'female';
}
