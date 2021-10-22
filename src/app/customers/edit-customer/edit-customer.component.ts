import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { CustomersService } from '../../services/customers.service';
import { Customer } from 'src/app/interfaces/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Order } from 'src/app/interfaces/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  editForm: FormGroup;
  customer: Customer;

  constructor(private fb: FormBuilder,
              private customerService: CustomersService,
              private route: ActivatedRoute,
              public productsService: ProductsService,
              private ordersService: OrdersService,
              private router: Router,
              ) {

    this.customer = this.route.snapshot.data["customer"];
    //this.orderDetails = this.route.snapshot.data["order"];

    this.editForm = this.fb.group({
      firstName:[this.customer.firstName, Validators.required],
      lastName:[this.customer.lastName, Validators.required],
      gender:[this.customer.gender, Validators.required],
      country:[this.customer.country, Validators.required],
      city:[this.customer.city, Validators.required],
      address:[this.customer.address, Validators.required],
      products:[null],
    })


   }

  ngOnInit(): void {
    this.productsService.initProducts();

  }

  onSubmit(){
      // const newCustomer: Customer = {...this.editForm.value};
      // if(this.customer.id){
      //   this.customerService.editCustomer(newCustomer, this.customer.id);
      //   const newOrder: Order = {
      //     customer: newCustomer,
      //     products: newCustomer.products,
      //   }
      // }

      // this.ordersService.editOrder(newOrder, );
      // this.router.navigateByUrl('customers');
  }

}
