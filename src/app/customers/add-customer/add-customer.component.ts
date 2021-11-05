import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { CustomersService } from '../../services/customers.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/interfaces/order';
import { FormsService } from '../../services/forms.service';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit, AfterViewInit {

  @ViewChildren('quantitySpan') quantitySpan: QueryList<any> = new QueryList();
  quantitySpanEl: QueryList<any> = new QueryList();

  addForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public productsService: ProductsService,
    private customerService: CustomersService,
    private ordersService: OrdersService,
    private renderer: Renderer2,
    private formsService: FormsService,
    ) {

      this.addForm = this.fb.group({
        firstName:[null, Validators.required],
        lastName:[null, Validators.required],
        gender:[null, Validators.required],
        country:[null, Validators.required],
        city:[null, Validators.required],
        address:[null, Validators.required],
        products:this.fb.array([]),
      })

  }

  ngOnInit(): void {

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

  onToggleBox(input: HTMLInputElement, id: string, quantityInput: HTMLInputElement){
    let inputValue = this.addForm.value.products;

    console.log(quantityInput.style.display);

    if(quantityInput.style.display === 'none'){
      this.renderer.setStyle(quantityInput,'display','inline');
    }else{
      this.renderer.setStyle(quantityInput,'display','none');
    }

    this.formsService.toggleBox(input, id, this.addForm, inputValue);
  }

  onSubmit(){
    const newCustomer: Customer = {...this.addForm.value};
    this.customerService.addCustomer(newCustomer);
    this.router.navigateByUrl('customers');
  }


}
