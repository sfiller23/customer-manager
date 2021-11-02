import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '../../interfaces/orderDetails';
import { OrderDetailsService } from '../../services/order-details.service';
import { Subscription } from 'rxjs';
import { first, last, take } from 'rxjs/operators';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit, OnDestroy {

  orderDetails: OrderDetails = {
    firstName: '',
    lastName: '',
    products: new Map<string,number>(),
    totalSum: 0,
  };

  subscription: Subscription = new Subscription();

  constructor(private orderdetailsService: OrderDetailsService) {
  }

  ngOnInit(): void {
    this.subscription = this.orderdetailsService.orderDetails$.subscribe(orderDetails=>{
      console.log(orderDetails);
      this.orderDetails = orderDetails;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
