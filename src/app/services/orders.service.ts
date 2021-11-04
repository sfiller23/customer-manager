import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { HttpService } from './http.service';
import { ProductsService } from './products.service';
import { OrderDetails } from '../interfaces/orderDetails';
import { CustomersService } from './customers.service';

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

  getAllOrders(): Observable<Order[]>{
    if(this.ordersSubject.value.length!==0){
      console.log(this.ordersSubject.value.length, 'length');
      return of(this.ordersSubject.value);
    }else{
      return this.httpService.getAll('orders');
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

  editOrder(newOrderDetails: Order){
    const currentOrders: Order[] = this.ordersSubject.value;
    let oldOrder = currentOrders.find(order=>order.id===newOrderDetails.id);
    let indexOforder: number = 0;
    if(oldOrder){
      indexOforder = currentOrders.indexOf(oldOrder);
    }
    currentOrders[indexOforder] = newOrderDetails;
    this.ordersSubject.next(currentOrders);
    if(newOrderDetails.id){
      this.httpService.edit('orders',newOrderDetails,newOrderDetails.id).subscribe();
    }

  }

  getOrder(id: string): Observable<Order | undefined>{
    if(this.ordersSubject.value){
      const currentOrders: Order[] = this.ordersSubject.value;
      const currentOrder: Order | undefined = currentOrders.find(order=>order.id===id);
      return of(currentOrder);
    }else{
       return this.httpService.getItem('orders', id).pipe(map(res=>{
         const currentOrder: Order = {...res};
         return currentOrder;
       }));
    }
  }

  orderTotalSum(ids: string[]): Observable<number>{
    let totalSum: number = 0;
    return this.productService.getProducts(ids).pipe(map(products=>{
      products.forEach(products=>{
        totalSum += products.price;
      })
      return totalSum;
    }))

  }


}
