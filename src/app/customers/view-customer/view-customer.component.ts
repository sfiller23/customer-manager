import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customer: any;

  constructor(private customersService: CustomersService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      this.customersService.getCustomer(params.id).subscribe(customer=>{
        this.customer = customer;
      })
    })

    //
  }

}
