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
import { OrdersService } from '../services/orders.service';
import { OrderDetailsService } from '../services/order-details.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<any> {

  constructor(private httpService: HttpService, private orderDetailsService: OrderDetailsService) {}

  resolve(route: ActivatedRouteSnapshot): any{

    const id = route.paramMap.get("id");

    if(id){
      this.orderDetailsService.setOrderDetailsByCustomerId(id);
    }else{
      return of(null);
    }
  }
}
