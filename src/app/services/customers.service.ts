import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer } from '../interfaces/customer';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { HttpService } from './http.service';
import { OrdersService } from './orders.service';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$: Observable<Customer[]> = this.customersSubject.asObservable();

  constructor(private router:Router, private httpService: HttpService, private ordersService: OrdersService) {
    this.initCustomers();
  }

  initCustomers(){
    if(this.customersSubject.value.length===0){
      this.httpService.getAll("customers").subscribe(customers=>{
        this.customersSubject.next(customers);
      })
    }
  }

  addCustomer(customer: Customer){
    let newCustomer: Customer;
    newCustomer = {...customer};
    let currentCustomers: Customer[] = this.customersSubject.value;
    currentCustomers.unshift(newCustomer);
    this.customersSubject.next(currentCustomers);
    this.httpService.add('customers',customer).subscribe(res=>{
      currentCustomers = this.customersSubject.value;
      currentCustomers[0].id = res.name;
      this.customersSubject.next(currentCustomers);
      const newOrder: Order = {
        customerId: res.name,
        products: customer.products,
      }
      this.ordersService.addOrder(newOrder);
    })
    console.log("customer Added");
  }

  editCustomer(newCustomerDetails: Customer, id: string){
    let currentCustomers: Customer[] = this.customersSubject.value;

    let updatedCustomer = currentCustomers.find(customer=>customer.id===id);

    let indexOfUpdatedCustomer: number = 0;

    if(updatedCustomer){
      indexOfUpdatedCustomer = currentCustomers.indexOf(updatedCustomer);
    }

    currentCustomers[indexOfUpdatedCustomer] = newCustomerDetails;

    this.customersSubject.next(currentCustomers);

    this.httpService.edit('customers',newCustomerDetails,id).subscribe();

  }

  getCustomer(id: string): Observable<Customer>{
    let currentCustomers: Customer[] = this.customersSubject.value;
    let cuurentCustomer: any = currentCustomers.find(customer=>customer.id===id);
    if(cuurentCustomer){
      return of(cuurentCustomer);
    }
    return this.httpService.getItem('customers',id);
  }

  deleteCustomer(id: string): void{
    const currentCustomers: Customer[] = this.customersSubject.value;
    let updatedCustomers = currentCustomers.filter(customer=>customer.id!==id);
    this.customersSubject.next(updatedCustomers);
    this.httpService.deleteItem('customers',id).subscribe();
  }

  removeProduct(customerId: any, productId: string): void{
    let currentCustomers: Customer[] = this.customersSubject.value;
    let currentCustomer: any = currentCustomers.find(customer=>customer.id===customerId);
    const currentCustomerProducts: string[] = currentCustomer.products;
    let updatedProducts = currentCustomerProducts.filter(id=>id!==productId);
    currentCustomer.products = updatedProducts;
    let indexOfCustomer = currentCustomers.indexOf(currentCustomer);
    currentCustomers[indexOfCustomer] = currentCustomer;
    this.customersSubject.next(currentCustomers);
  }
}
