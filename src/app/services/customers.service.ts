import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../interfaces/customer';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$: Observable<Customer[]> = this.customersSubject.asObservable();

  constructor(private httpService: HttpService) { }

  addCustomer(customer: Customer){
    this.httpService.add('customers',customer).subscribe(res=>{
      customer.id = res.name;
      let currentCustomers = this.customersSubject.value;
      currentCustomers.unshift(customer);
      this.customersSubject.next(currentCustomers);
    });
  }


}
