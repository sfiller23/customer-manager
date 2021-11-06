import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../interfaces/product';
import { CustomersService } from '../services/customers.service';
import { OrdersService } from '../services/orders.service';
import { OrderDetails } from '../interfaces/orderDetails';
import { HttpService } from '../services/http.service';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { CustomerDetailsServiceService } from '../services/customer-details-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  ordersPageSubject$ = new BehaviorSubject<OrderDetails[]>([]);

  subscription: Subscription = new Subscription();

  constructor(private customerDetailsService: CustomerDetailsServiceService,private customersService: CustomersService ,public ordersService: OrdersService, private httpService: HttpService, private productsService: ProductsService) { }

  ngOnInit(): void {
    let orderPageItems: OrderDetails[] = [];
    this.subscription = this.ordersService.orders$.subscribe(currentOrders=>{
      currentOrders.forEach(order=>{
        // this.customersService.getCustomer(order.customerId).subscribe(customer=>{
        //   const currentOrder: OrderDetails = {
        //     firstName: customer.firstName,
        //     lastName: customer.lastName,
        //     products: new Map<string,number>(),
        //     totalSum: -1,
        //   };
        //   if(order.totalSum){
        //     currentOrder.totalSum = order.totalSum
        //   };
        //   // this.productsService.getProducts(order.products).subscribe(products=>{
        //   //   products.forEach(product=>{
        //   //     currentOrder.products.set(product.name,product.price);
        //   //   });
        //   //   orderPageItems.push(currentOrder);
        //   //   this.ordersPageSubject$.next(orderPageItems);
        //   // });

        // });

      });
    })

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }





}
