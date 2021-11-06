import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsServiceService {

  currentCustomer: Customer = {
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    country: '',
    city: '',
    address: '',
  }

  private customerSubject = new BehaviorSubject<Customer>(this.currentCustomer);
  customer$: Observable<Customer> = this.customerSubject.asObservable();

  constructor() {

   }

  initCustomer(customer: Customer){
      this.customerSubject.next(customer);
  }


}
