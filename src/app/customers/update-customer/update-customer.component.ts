import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { CustomersService } from '../../services/customers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/interfaces/order';
import { FormsService } from '../../services/forms.service';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit, AfterViewInit {

  @ViewChildren('quantitySpan') quantitySpan: QueryList<any> = new QueryList();
  quantitySpanEl: QueryList<any> = new QueryList();

  addForm: FormGroup;

  customer: Customer;

  mode: string = 'ADD';

  orders: any;

  orderProductsMap: Map<string,number> = new Map<string,number>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public productsService: ProductsService,
    private customerService: CustomersService,
    private ordersService: OrdersService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    ) {

      this.customer = this.route.snapshot.data['customer'];

      if(this.customer){
        this.mode = 'EDIT';
      }
      console.log(this.mode);
      if(this.mode === 'EDIT'){
        this.addForm = this.fb.group({
          firstName:[this.customer.firstName, Validators.required],
          lastName:[this.customer.lastName, Validators.required],
          gender:[this.customer.gender, Validators.required],
          country:[this.customer.country, Validators.required],
          city:[this.customer.city, Validators.required],
          address:[this.customer.address, Validators.required],
        })
      }else{
        this.addForm = this.fb.group({
          firstName:[null, Validators.required],
          lastName:[null, Validators.required],
          gender:[null, Validators.required],
          country:[null, Validators.required],
          city:[null, Validators.required],
          address:[null, Validators.required],
        })
      }



  }

  ngOnInit(): void {
    if(this.mode === 'EDIT'){
      this.ordersService.orders$.subscribe(orders=>{
        let currentOrders = orders.filter(order=>order.customerId===this.customer.id);
        if(currentOrders){
          this.orders = currentOrders;
        }
      });
    }
  }

  ngAfterViewInit(): void{
    this.quantitySpanEl = this.quantitySpan;
    //const options: HTMLCollectionOf<HTMLOptionElement> = selectElemnt.options;

  }

  setQuantitySelector(option: HTMLOptionElement){

    const valueArr = option.value.split(':');

    const currentSpan =  this.quantitySpanEl.find(item=>item.nativeElement.id == valueArr[0]);

    console.log(currentSpan);

    if(currentSpan){
      this.renderer.setStyle(currentSpan.nativeElement,'display','block');
    }

  }

  onToggleBox(id: string, quantityInput: HTMLInputElement){

    if(quantityInput.style.display === 'none'){
      this.renderer.setStyle(quantityInput,'display','inline');
      this.orderProductsMap.set(id, 1);
    }else{
      this.orderProductsMap.delete(id);
      quantityInput.value = '1';
      this.renderer.setStyle(quantityInput,'display','none');
    }
    console.log(this.orderProductsMap.values());
    //this.formsService.toggleBox(input, id, this.addForm, inputValue);
  }

  setQuantity(value: string, productId: string){
    this.orderProductsMap.set(productId, +value);
    console.log(this.orderProductsMap);
  }

  deleteOrder(id: string){
    this.ordersService.deleteOrder(id);
  }

  onSubmit(){
    const newCustomer: Partial<Customer> = {
      firstName: this.addForm.controls['firstName'].value,
      lastName: this.addForm.controls['lastName'].value,
      gender: this.addForm.controls['gender'].value,
      country: this.addForm.controls['country'].value,
      city: this.addForm.controls['country'].value,
      address: this.addForm.controls['address'].value,
    }
    const newOrder: Partial<Order> = {
      products: this.orderProductsMap,
    }
    if(this.mode==='ADD'){
      this.customerService.addCustomer(newCustomer, newOrder);
    }else{
      newCustomer.id = this.customer.id;
      if(newOrder.products){

        if(this.orderProductsMap.size>0){
          newOrder.customerId = this.customer.id;
          this.ordersService.addOrder(newOrder);
        }
      }
      this.customerService.editCustomer(<Customer>newCustomer);

    }

    this.router.navigateByUrl('customers');
  }


}
