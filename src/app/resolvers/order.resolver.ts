import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { Customer } from '../interfaces/customer';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<any> {

  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {

      // const id = route.paramMap.get("id");

      // const orderDetails: OrderDetails = {
      //   orderId: '',
      //   firstName: '',
      //   lastName: '',
      //   productsNames: [],
      //   productsPrices: [],
      //   totalSum: 0,
      // }

      // let orderDetails$: Observable<typeof orderDetails> = new Observable<typeof orderDetails>();

      // if(id){
      //   orderDetails$ = this.httpService.getItemC('customers',id).pipe(map(customer=>{
      //       let sum = 0;
      //       orderDetails.firstName = customer.firstName;
      //       orderDetails.lastName = customer.lastName;
      //       this.httpService.getItems('products',customer.products).subscribe(products=>{
      //         let sum = 0;
      //         console.log(products);
      //         products.forEach(product=>{
      //           console.log(product.name);
      //           orderDetails.productsNames?.push(product.name);
      //           orderDetails.productsPrices?.push(product.price);
      //           sum += product.price;
      //         });
      //         orderDetails.totalSum = sum;

      //       });
      //       return orderDetails;
      //     }))
      // }



      // return orderDetails$;
  }
}
