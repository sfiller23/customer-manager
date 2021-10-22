import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { CustomersService } from '../../services/customers.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public productsService: ProductsService,
    private customerService: CustomersService,
    private ordersService: OrdersService
    ) {

      this.addForm = this.fb.group({
        firstName:[null, Validators.required],
        lastName:[null, Validators.required],
        gender:[null, Validators.required],
        country:[null, Validators.required],
        city:[null, Validators.required],
        address:[null, Validators.required],
        products:[null, Validators.required],
      })

  }

  ngOnInit(): void {

  }

  onSubmit(){
    const newCustomer: Customer = {...this.addForm.value};
    this.customerService.addCustomer(newCustomer);
    this.router.navigateByUrl('customers');
  }


}
