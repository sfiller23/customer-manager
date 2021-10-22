import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '../../interfaces/orderDetails';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  // orderDetails: OrderDetails = {
  //   orderId: '',
  //   firstName: '',
  //   lastName: '',
  //   productsNames: [],
  //   productsPrices: [],
  //   totalSum: 0,

  // }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.orderDetails = this.route.snapshot.data["order"];
  }

}
