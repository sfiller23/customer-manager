import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '../../interfaces/orderDetails';
import { OrderDetailsService } from '../../services/order-details.service';
import { Subscription } from 'rxjs';
import { first, last, take } from 'rxjs/operators';
import { CustomerDetailsServiceService } from '../../services/customer-details-service.service';
import { OrdersService } from '../../services/orders.service';
import { CustomersService } from '../../services/customers.service';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { OrderView } from 'src/app/interfaces/orderView';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit, OnDestroy {

  orderDetails: OrderDetails = {
    orderId: '',
    customerId: '',
    firstName: '',
    lastName: '',
    products: [],
    totalQuantity: 0,
    totalSum: 0,
  };

  customer: any;

  subscription: Subscription = new Subscription();

  constructor(private productsService: ProductsService, private customersService: CustomersService ,private orderService: OrdersService ,private route: ActivatedRoute,private customerDetailsServiceService: CustomerDetailsServiceService ,private orderdetailsService: OrderDetailsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      let orderId = params.id;
      this.orderdetailsService.setOrderDetails(orderId);
    })
    this.subscription = this.orderdetailsService.orderDetails$.subscribe(orderDetails=>{
      this.orderDetails = orderDetails;
    })

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
