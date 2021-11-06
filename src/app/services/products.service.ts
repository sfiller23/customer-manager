import { CustomersService } from './customers.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpService } from './http.service';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private httpService: HttpService) {
    this.initProducts();
  }

  initProducts(){
    if(this.productsSubject.value.length===0){
      this.httpService.getAll("products").subscribe(res=>{
        this.productsSubject.next(res);
      })
    }
  }

  getProducts(ids: string[]): Observable<Product[]>{
    const currentProducts = this.productsSubject.value;
    let product: any[] = currentProducts.filter(product=>ids.includes(product.id));
    if(product.length!==0){
      return of(product);
    }
    return this.httpService.getItems('products',ids);
  }

  deleteProduct(productId: string, customer: Customer){
    // const currentProducts: string[] = customer.products;
    // let updatedProducts: string[] = currentProducts.filter(id=>id!==productId);
    // console.log(updatedProducts);
    // this.httpService.updateItem("customers",customer.id,"products",updatedProducts).subscribe();

  }




}
