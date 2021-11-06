import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PageService } from '../services/page.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CustomersService } from '../services/customers.service';
import { Customer } from '../interfaces/customer';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-view-nav',
  templateUrl: './view-nav.component.html',
  styleUrls: ['./view-nav.component.css']
})
export class ViewNavComponent implements OnInit, OnDestroy {

  @Input() query: string = 'shimon';

  pageView: any;

  sunscription: Subscription = new Subscription();

  customers: Customer[] = []

  constructor(public pageService: PageService, public customersService: CustomersService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.pageService.pageView$.pipe(first()).subscribe(pageView=>{
      this.pageView = pageView;
    })

    this.customersService.customers$.subscribe(customers=>{
      //this.customers = customers;
    })

  }

  ngOnDestroy(): void{
    this.sunscription.unsubscribe();
  }

  setQuery(value: string){
    this.searchService.setQuery(value);
  }

}
