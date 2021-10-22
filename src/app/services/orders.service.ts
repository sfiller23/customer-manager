import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { HttpService } from './http.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$: Observable<Order[]> = this.ordersSubject.asObservable();

  constructor(private httpService: HttpService, private productService: ProductsService) {
    this.initOrders();
   }

  initOrders(){
    if(this.ordersSubject.value.length===0){
      this.httpService.getAll('orders').subscribe(res=>{
        this.ordersSubject.next(res);
      })
    }
  }

  addOrder(order: Order){
    let newOrder: Order;
    this.orderTotalSum(order.products).subscribe(totalSum=>{
      order.totalSum = totalSum;
      newOrder = order;
      let currentOrders: Order[] = this.ordersSubject.value;
      currentOrders.unshift(newOrder);
      this.ordersSubject.next(currentOrders);
      this.httpService.add('orders',order).subscribe(res=>{
        currentOrders = this.ordersSubject.value;
        currentOrders[0].id = res.name;
        this.ordersSubject.next(currentOrders);
      })
    })

  }

  editOrder(newOrderDetails: Order, id: string){
    const currentOrders: Order[] = this.ordersSubject.value;
    currentOrders.forEach(order=>{
      if(order.id = id){
        order = newOrderDetails;
      }
    })
    this.ordersSubject.next(currentOrders);
    this.httpService.edit('orders',newOrderDetails,id).subscribe();
  }

  private orderTotalSum(ids: string[]): Observable<number>{
    let totalSum: number = 0;
    return this.productService.getProducts(ids).pipe(map(products=>{
      products.forEach(products=>{
        totalSum += products.price;
      })
      return totalSum;
    }))

  }


}
