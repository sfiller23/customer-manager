import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { CustomersService } from '../services/customers.service';
import { OrdersService } from '../services/orders.service';
import { OrderDetails } from '../interfaces/orderDetails';
import { HttpService } from '../services/http.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderDetails: OrderDetails[] = [];

  constructor(public ordersService: OrdersService, private httpService: HttpService) { }

  ngOnInit(): void {
   this.ordersService.initOrders();

  //  this.ordersService.orders$.pipe().subscribe(orders=>{

  //   orders.forEach(order=>{
  //     const orderDetails: OrderDetails = {
  //       orderId: '',
  //       firstName: order.customer.firstName,
  //       lastName: order.customer.lastName,
  //       productsNames: [],
  //       productsPrices: [],
  //       totalSum: 0
  //     }
  //     if(order.id){
  //       orderDetails.orderId = order.id;
  //     }
  //     this.httpService.getItems('products',order.products).subscribe(products=>{
  //       let sum = 0;
  //       console.log(products);
  //       products.forEach(product=>{
  //         console.log(product.name);
  //         orderDetails.productsNames?.push(product.name);
  //         orderDetails.productsPrices?.push(product.price);
  //         sum += product.price;
  //       });
  //       orderDetails.totalSum = sum;
  //       this.orderDetails.push(orderDetails);
  //       console.log(this.orderDetails, "details");
  //     });

  //   })


  //  })

  }





}
