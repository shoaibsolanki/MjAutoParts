export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  Description: string;
  img: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface DeliveryAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export type PaymentMethod = 'cash' | 'card';

export interface Order {
  items: CartItem[];
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  total: number;
}