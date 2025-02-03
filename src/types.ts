export interface Product {
  id: string;  // Firestore IDs are strings
  name: string;
  category:string;
  price: number;
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