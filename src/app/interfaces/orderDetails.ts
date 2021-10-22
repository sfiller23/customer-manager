export interface OrderDetails{
  firstName: string,
  lastName: string,
  products: Map<string,number>;
  totalSum: number;
}
