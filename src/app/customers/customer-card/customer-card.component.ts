import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent implements OnInit, OnDestroy {

  pageView: any;

  Subscription: Subscription = new Subscription();

  constructor(private pageService: PageService ,public customerService: CustomersService, private httpService: HttpService) { }

  ngOnInit(): void {

    this.pageService.pageView$.subscribe(pageView=>{
      this.pageView = pageView;
    })

  }

  deleteCustomer(id: string): void{
    this.customerService.deleteCustomer(id);
  }

  ngOnDestroy(): void{
    this.Subscription.unsubscribe();
  }

}
