import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, OnDestroy, DoCheck, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../interfaces/customer';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerDetailsServiceService } from '../services/customer-details-service.service';
import { Subscription } from 'rxjs';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy, AfterViewChecked{

  // dataFromChild: any;
  // @ViewChild(EditCustomerComponent,{static:false}) child: any;
  customer: any;

  customerId: string = '';

  subscription: Subscription = new Subscription();

  constructor(private pageService: PageService ,private cdRef : ChangeDetectorRef,private route: ActivatedRoute, private customerDetailsServiceService: CustomerDetailsServiceService) {


  }

  ngOnInit(): void {
    this.subscription = this.customerDetailsServiceService.customer$.subscribe(customer=>{
      this.customer = customer;
      console.log(customer, "im in constomers cimpopopo");
    })




  }

  ngAfterViewChecked(): void{
    if(this.customer.id!==''){
      this.cdRef.detectChanges();
    }
  }

  ngOnDestroy(): void{

    this.subscription.unsubscribe();
  }




}
