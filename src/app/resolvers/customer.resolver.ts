import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { CustomersService } from '../services/customers.service';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<any> {

  constructor(private customerService: CustomersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any>{

      const id = route.paramMap.get("id");

      let currentCustomer;

      console.log("im resolving");
      console.log(id);


      if(id){
        currentCustomer = this.customerService.getCustomer(id);
        console.log(id, "resolved");
        return currentCustomer;
      }else{
        return of(null);
      }





  }
}
