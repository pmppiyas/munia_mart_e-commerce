export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItemProduct {
  id: string;
  name: string;
  sku?: string;
  price: number;
  images?: string[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
  product?: OrderItemProduct;
}

export interface Order {
  id: string;
  customerId: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}
