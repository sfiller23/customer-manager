import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { HttpService } from './http.service';
import { ProductsService } from './products.service';
import { OrderDetails } from '../interfaces/orderDetails';
import { CustomersService } from './customers.service';
import { provideRoutes } from '@angular/router';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersSubject = new BehaviorSubject<Partial<Order>[]>([]);
  orders$: Observable<Partial<Order>[]> = this.ordersSubject.asObservable();

  constructor(private httpService: HttpService, private productService: ProductsService) {
    this.initOrders();
   }

  initOrders(){
    if(this.ordersSubject.value.length===0){
      this.httpService.getAll('orders').subscribe(orders=>{
        const appOrders: Order[] = [];
        orders.forEach(order=>{
          appOrders.push(this.fromApiObjToAppObj(order));
        });
        this.ordersSubject.next(appOrders);
      });
    }
  }

  getAllOrders(): Observable<Partial<Order>[]>{
    if(this.ordersSubject.value.length!==0){
      return of(this.ordersSubject.value);
    }else{
      return this.httpService.getAll('orders').pipe(map(orders=>{
        const appOrders: Order[] = [];
        orders.forEach(order=>{
          appOrders.push(this.fromApiObjToAppObj(order));
        });
        return appOrders;
      }));
    }
  }

  addOrder(order: Partial<Order>){
    if(order.products){
      this.orderTotalSum(order.products).subscribe(totalSum=>{
        order.totalSum = totalSum;
        let currentOrders: Partial<Order>[] = this.ordersSubject.value;
        currentOrders.unshift(order);
        this.ordersSubject.next(currentOrders);
        const convertedOrderObj = this.fromAppObjToApiObj(order);
        this.httpService.add('orders',convertedOrderObj).subscribe(res=>{
          currentOrders = this.ordersSubject.value;
          currentOrders[0].id = res.name;
          this.ordersSubject.next(currentOrders);
        })
      })
    }


  }

  // editOrder(newOrderDetails: Order){
  //   const currentOrders: Partial<Order>[] = this.ordersSubject.value;
  //   let oldOrder = currentOrders.find(order=>order.id===newOrderDetails.id);
  //   let indexOforder: number = 0;
  //   if(oldOrder){
  //     indexOforder = currentOrders.indexOf(oldOrder);
  //   }
  //   currentOrders[indexOforder] = newOrderDetails;
  //   this.ordersSubject.next(currentOrders);
  //   if(newOrderDetails.id){
  //     this.httpService.edit('orders',newOrderDetails,newOrderDetails.id).subscribe();
  //   }

  // }

  deleteOrder(id: string){
    let currentOrders = this.ordersSubject.value;
    let updatedOrders = currentOrders.filter(order=>order.id!==id);
    this.ordersSubject.next(updatedOrders);
    this.httpService.deleteItem('orders', id).subscribe();
  }

  getOrder(id: string): Observable<Partial<Order> | undefined>{
    if(this.ordersSubject.value.length!==0){
      const currentOrders: Partial<Order>[] = this.ordersSubject.value;
      const currentOrder: Partial<Order> | undefined = currentOrders.find(order=>order.id===id);
      return of(currentOrder);
    }else{
       return this.httpService.getItem('orders', id).pipe(map(order=>{
        return this.fromApiObjToAppObj(order);
       }));
    }
  }

  orderTotalSum(productsMap: Map<string,number>): Observable<number>{
    let totalSum: number = 0;
    let producsIds: string[] = [];
    for(let key in productsMap.keys){
      producsIds.push(key);
    }
    return this.productService.getProducts(producsIds).pipe(map(products=>{
      products.forEach(product=>{
        let quantity = productsMap.get(product.id);
        if(quantity){
          totalSum += product.price*quantity;
        }
      })
      return totalSum;
    }))

  }

  private fromApiObjToAppObj(order: any): Order{
    const productsMap: Map<string,number> = new Map<string,number>();
    let currentOrder: Partial<Order> = {
      id: order.id,
      customerId: order.customerId,
      totalQuantity: order.totalQuantity,
      totalSum: order.totalSum,
    }
    for(let i = 0; i<order.productsIds.length; i++){
     productsMap.set(order.productsIds[i],order.productsQuantity[i]);
    }
    currentOrder.products = productsMap;
    return <Order>currentOrder;
  }

  private fromAppObjToApiObj(order: any): any{
    let productsIdsArr: string[] = [];
    let productsQuantityArr: number[] = [];
    if(order.products){
      for(let id of order.products.keys()){
        productsIdsArr.push(id);
      }
      let totalQuantity = 0;
      for(let quantity of order.products.values()){
        totalQuantity += +quantity;
        productsQuantityArr.push(+quantity);
      }
      order.totalQuantity = totalQuantity;
    }
    const convertedOrderObj = {
      customerId: order.customerId,
      productsIds: productsIdsArr,
      productsQuantity: productsQuantityArr,
      totalQuantity: order.totalQuantity,
      totalSum: order.totalSum,
    }

    return convertedOrderObj;
  }


}
