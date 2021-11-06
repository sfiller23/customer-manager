import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '../../interfaces/orderDetails';
import { OrderDetailsService } from '../../services/order-details.service';
import { Subscription } from 'rxjs';
import { first, last, take } from 'rxjs/operators';
import { CustomerDetailsServiceService } from '../../services/customer-details-service.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit, OnDestroy {

  orderDetails: OrderDetails = {
    firstName: '',
    lastName: '',
    products: [],
    totalQuantity: 0,
    totalSum: 0,
  };

  customer: any;

  subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,private customerDetailsServiceService: CustomerDetailsServiceService ,private orderdetailsService: OrderDetailsService) {
  }

  ngOnInit(): void {
    this.subscription = this.orderdetailsService.orderDetails$.subscribe(orderDetails=>{
      console.log(orderDetails);
      this.orderDetails = orderDetails;
    })

    this.customer = this.route.snapshot.data["customer"];
    if(this.customer){
      this.customerDetailsServiceService.initCustomer(this.customer);
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
