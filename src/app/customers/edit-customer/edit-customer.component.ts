import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { CustomersService } from '../../services/customers.service';
import { Customer } from 'src/app/interfaces/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Order } from 'src/app/interfaces/order';
import { OrdersService } from '../../services/orders.service';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CustomerDetailsServiceService } from '../../services/customer-details-service.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit, OnDestroy {

  editForm: FormGroup;
  customer: Customer;
  customerProducts: Product[] = [];

  subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private customersService: CustomersService,
              private route: ActivatedRoute,
              public productsService: ProductsService,
              private customerDetailsService: CustomerDetailsServiceService,
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
    this.customerDetailsService.initCustomer(this.customer);

    this.subscription = this.customersService.customers$.subscribe(()=>{
      this.productsService.getProducts(this.customer.products).pipe(first()).subscribe(products=>{
        this.customerProducts = products;
      })
    })
    console.log(this.customer.id, 'editcomponent')

    // this.outputId.emit({id:this.customer.id});
  }

  deleteProduct(id: string){
    this.customersService.removeProduct(this.customer.id, id);
    this.productsService.deleteProduct(id, this.customer);
  }

  onSubmit(){


    const firstName = this.editForm.controls["firstName"].value;
    const lastName = this.editForm.controls["lastName"].value;
    const gender = this.editForm.controls["gender"].value;
    const country = this.editForm.controls["country"].value;
    const city = this.editForm.controls["city"].value;
    const address = this.editForm.controls["address"].value;
    let oldProductsIds: string[] = [];
    this.customerProducts.forEach(product=>{
      oldProductsIds.push(product.id);
    })

    let updatedProducts: string[] = [];

    if(this.editForm.controls["products"].value){
      updatedProducts = [...oldProductsIds,...this.editForm.controls["products"].value];
    }else{
      updatedProducts = oldProductsIds;
    }


    const updatedCustomer: Customer = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      country: country,
      city: city,
      address: address,
      products: updatedProducts,
    }
    if(this.customer.id){
      console.log("id exists");
      this.customersService.editCustomer(updatedCustomer, this.customer.id);
      this.router.navigateByUrl('customers');
    }



  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
