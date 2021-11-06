export interface Order{
  id: string;
  customerId: string;
  products: Map<string,number>;
  totalQuantity: number;
  totalSum: number;
}


