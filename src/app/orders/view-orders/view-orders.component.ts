import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '../../interfaces/orderDetails';
import { OrderDetailsService } from '../../services/order-details.service';
import { Subscription } from 'rxjs';
import { first, last, take } from 'rxjs/operators';
import { CustomerDetailsServiceService } from '../../services/customer-details-service.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit, OnDestroy {

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

  orders: any;

  subscription: Subscription = new Subscription();

  constructor(private ordersService: OrdersService ,private route: ActivatedRoute,private customerDetailsServiceService: CustomerDetailsServiceService ,private orderdetailsService: OrderDetailsService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      const customerId = params.id;
      this.subscription = this.ordersService.getAllOrders().subscribe(orders=>{
        let currentOrders = orders.filter(order=>order.customerId===customerId);
        if(currentOrders){
          this.orders = currentOrders;
        }
      });
    })

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
