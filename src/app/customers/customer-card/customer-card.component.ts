import { Component, OnInit, OnDestroy, ElementRef, AfterViewChecked, Renderer2, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { SearchService } from '../../services/search.service';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent implements OnInit, OnDestroy, AfterViewInit {

  pageView: any;

  subscription: Subscription = new Subscription();

  totalSums: Map<string,number> = new Map<string,number>();

  query: any;

  sortBy: any;

  @ViewChildren('tableRef') tableRef: QueryList<ElementRef> = new QueryList();



  constructor(private sortService: SortService ,private renderer: Renderer2 ,private searchService: SearchService ,private pageService: PageService ,public customerService: CustomersService, private ordersService: OrdersService) {
    //this.tableRef = this.el;
  }

  ngOnInit(): void {

    this.pageService.pageView$.subscribe(pageView=>{
      this.pageView = pageView;

    this.searchService.query$.subscribe(query=>{
      this.query = query;
    })

    this.sortService.sort$.subscribe(sortBy=>{
      this.sortBy = sortBy;
    })

  })

    this.customerService.customers$.subscribe(customers=>{
      customers.forEach(customer=>{
        this.subscription = this.ordersService.orderTotalSum(customer.products).subscribe(totalSum=>{
          if(customer.id){
            this.totalSums.set(customer.id,totalSum);
          }
        })
      })
    })

  }

  deleteCustomer(id: string): void{
    this.customerService.deleteCustomer(id);
  }

  setSortingBy(sortBy: string){
    this.sortService.setSorting(sortBy);

  }

  ngAfterViewInit(): void{
    let table = this.tableRef;
    console.log(table);

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
