import { Injectable } from '@angular/core';
import { CustomersService } from './customers.service';
import { OrdersService } from './orders.service';
import { OrderDetails } from '../interfaces/orderDetails';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Order } from '../interfaces/order';
import { ProductsService } from './products.service';
import { OrderView } from '../interfaces/orderView';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  private currentOrderDetalis: OrderDetails = {
    firstName: '',
    lastName: '',
    products: [],
    totalQuantity: 0,
    totalSum: 0,
  }

  private orderDetailsSubject = new BehaviorSubject<OrderDetails>(this.currentOrderDetalis);
  orderDetails$: Observable<OrderDetails> = this.orderDetailsSubject.asObservable();

  constructor(private customersService: CustomersService, private ordersService: OrdersService, private productsService: ProductsService) {

  }

  setOrderDetailsByCustomerId(id: string): void{
    // this.ordersService.getAllOrders().subscribe(orders=>{
    //   console.log(orders, "orders");
    //   const currentOrder: any = orders.find(order=>order.customerId===id);
    //   console.log(currentOrder, "in details service");
    //   if(currentOrder){
    //     this.currentOrderDetalis.totalSum = currentOrder.totalSum;
    //     this.currentOrderDetalis.products.clear();
    //     this.productService.getProducts(currentOrder.products).pipe(first()).subscribe(products=>{
    //       products.forEach(product=>{
    //         console.log(product, "in foreach");
    //         this.currentOrderDetalis.products.set(product.name, product.price);
    //       });
    //       this.customerService.getCustomer(id).subscribe(customer=>{
    //         this.currentOrderDetalis.firstName = customer.firstName;
    //         this.currentOrderDetalis.lastName = customer.lastName;

    //         this.orderDetailsSubject.next(this.currentOrderDetalis);

    //       })

    //     })
    //   }
    // })

  }

  setOrderDetails(orderId: string){
    let orderDetails: Partial<OrderDetails> = {};
    orderDetails.products = [];
    this.ordersService.getOrder(orderId).subscribe(order=>{
      if(order){
        console.log(order);
        if(order.totalSum){
          orderDetails.totalSum = order.totalSum;
        }
        if(order.totalQuantity){
          orderDetails.totalQuantity = order.totalQuantity;
        }
        console.log(orderDetails, 'from details');
        if(order.customerId){
          this.customersService.getCustomer(order.customerId).subscribe(customer=>{
            orderDetails.firstName = customer.firstName;
            orderDetails.lastName = customer.lastName;
            let productsIds: string[] = [];
            let productsQuantity: number[] = [];
            console.log(order.products, 'in details half way');
            if(order.products){
              for(let [key,value] of order.products){
                productsIds.push(key);
                productsQuantity.push(value);
              }
              console.log(productsIds);
              this.productsService.getProducts(productsIds).subscribe(products=>{
                let i = 0;
                products.forEach(product=>{
                  const orderView: OrderView = {
                    name: product.name,
                    price: product.price,
                    quantity: productsQuantity[i],
                  }
                  i++;
                  if(orderDetails.products){
                    console.log('final step');
                    orderDetails.products.push(orderView);
                  }
                });
                console.log(orderDetails);
                this.orderDetailsSubject.next(<OrderDetails>orderDetails);
              })
            }
          });
        }

      }
    })
  }

  updateOrderByCustomerId(customerId: string, products: string[]){
    this.ordersService.getAllOrders().subscribe(orders=>{
      let customerOrder = orders.find(order=>order.customerId===customerId);
      if(customerOrder){
        // customerOrder.products = products;
        // this.ordersService.orderTotalSum(products).subscribe(totalSum=>{
        //   if(customerOrder){
        //     customerOrder.totalSum = totalSum;
        //     if(customerOrder.id){
        //       this.ordersService.editOrder(customerOrder);
        //     }
        //   }
        // })
      }
    });
  }
}
