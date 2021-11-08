import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../interfaces/product';
import { CustomersService } from '../services/customers.service';
import { OrdersService } from '../services/orders.service';
import { OrderDetails } from '../interfaces/orderDetails';
import { HttpService } from '../services/http.service';
import { first, map, take, tap, distinct, last } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { OrderDetailsService } from '../services/order-details.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

  ordersPageSubject$ = new BehaviorSubject<Map<string,OrderDetails[]>>(new Map<string,OrderDetails[]>());

  ordersSubscription: Subscription = new Subscription();

  customersSubscription: Subscription = new Subscription();

  orderDetailsSubscription: Subscription = new Subscription();

  orderMap: Map<string,OrderDetails[]> = new Map<string,OrderDetails[]>();

  ordersLength = 0;

  i = 0;

  constructor(private cdRef : ChangeDetectorRef ,private orderDetailsService: OrderDetailsService,private customersService: CustomersService ,public ordersService: OrdersService, private httpService: HttpService, private productsService: ProductsService) { }

  ngOnInit(): void {
    const set = new Set();
    this.customersSubscription = this.customersService.customers$.pipe(distinct()).subscribe(customers=>{
      customers.forEach(customer=>{
        if(customer.id){
          if(!this.orderMap.has(customer.id)){
            this.orderMap.set(customer.id, []);
          }
        }

      });
      console.log(this.orderMap,"finished loop");
      this.orderDetailsService.orderDetails$.pipe(distinct()).subscribe(orderDetails=>{
        if(orderDetails.customerId){
          if(!set.has(orderDetails.orderId)){
            const currentDetailsArr = this.orderMap.get(orderDetails.customerId);
            this.orderMap.delete(orderDetails.customerId);;
            if(currentDetailsArr){

                currentDetailsArr.push(orderDetails);
                this.orderMap.set(orderDetails.customerId,currentDetailsArr);
                set.add(orderDetails.orderId);
                this.i++;
              }

          }


        }


      });

    });






}

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(){
    this.ordersSubscription = this.ordersService.orders$.subscribe(currentOrders=>{
      this.ordersLength = currentOrders.length;
      if(this.ordersLength>0){
        currentOrders.forEach(order=>{
          if(order.id){
              this.orderDetailsService.setOrderDetails(order.id);
          }
        });
      }
      if(this.i===this.ordersLength){

        this.ordersPageSubject$.next(this.orderMap);
      }
    });
  }

  ngOnDestroy(){
    console.log("destroy");
    this.ordersSubscription.unsubscribe();
    this.customersSubscription.unsubscribe();
    this.orderDetailsSubscription.unsubscribe();
  }





}
