import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpService } from './http.service';

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
    if(product){
      return of(product);
    }
    return this.httpService.getItems('products',ids);
  }




}
