import { OrderView } from './orderView';


export interface OrderDetails{
  firstName: string,
  lastName: string,
  products: OrderView[];
  totalQuantity: number;
  totalSum: number;
}
