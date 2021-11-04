import { Injectable } from '@angular/core';
import { CustomersService } from './customers.service';
import { OrdersService } from './orders.service';
import { OrderDetails } from '../interfaces/orderDetails';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Order } from '../interfaces/order';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  private currentOrderDetalis: OrderDetails = {
    firstName: '',
    lastName: '',
    products: new Map<string,number>(),
    totalSum: 0,
  }

  private orderDetailsSubject = new BehaviorSubject<OrderDetails>(this.currentOrderDetalis);
  orderDetails$: Observable<OrderDetails> = this.orderDetailsSubject.asObservable();

  constructor(private customerService: CustomersService, private ordersService: OrdersService, private productService: ProductsService) {

  }

  setOrderDetailsByCustomerId(id: string): void{
    this.ordersService.getAllOrders().subscribe(orders=>{
      console.log(orders, "orders");
      const currentOrder: any = orders.find(order=>order.customerId===id);
      console.log(currentOrder, "in details service");
      if(currentOrder){
        this.currentOrderDetalis.totalSum = currentOrder.totalSum;
        this.currentOrderDetalis.products.clear();
        this.productService.getProducts(currentOrder.products).pipe(first()).subscribe(products=>{
          products.forEach(product=>{
            console.log(product, "in foreach");
            this.currentOrderDetalis.products.set(product.name, product.price);
          });
          this.customerService.getCustomer(id).subscribe(customer=>{
            this.currentOrderDetalis.firstName = customer.firstName;
            this.currentOrderDetalis.lastName = customer.lastName;

            this.orderDetailsSubject.next(this.currentOrderDetalis);

          })

        })
      }
    })

  }

  updateOrderByCustomerId(customerId: string, products: string[]){
    this.ordersService.getAllOrders().subscribe(orders=>{
      let customerOrder = orders.find(order=>order.customerId===customerId);
      if(customerOrder){
        customerOrder.products = products;
        this.ordersService.orderTotalSum(products).subscribe(totalSum=>{
          if(customerOrder){
            customerOrder.totalSum = totalSum;
            if(customerOrder.id){
              this.ordersService.editOrder(customerOrder);
            }
          }
        })
      }
    });
  }
}
