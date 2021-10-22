import { Product } from "./product";

export interface Customer {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  city: string;
  address: string;
  products: string[];

}
