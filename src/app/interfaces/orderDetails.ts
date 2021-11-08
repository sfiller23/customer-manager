import { OrderView } from './orderView';


export interface OrderDetails{
  orderId: string;
  customerId: string,
  firstName: string,
  lastName: string,
  products: OrderView[];
  totalQuantity: number;
  totalSum: number;
}
