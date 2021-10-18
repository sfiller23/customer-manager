import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private httpService: HttpService) { }

  initProducts(){
    if(this.productsSubject.value.length==0){
      this.httpService.getAll("products").subscribe(res=>{
        console.log(res, "products");
        this.productsSubject.next(res);
      })
    }
  }




}
