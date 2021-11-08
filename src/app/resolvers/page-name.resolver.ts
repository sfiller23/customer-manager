import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PageService } from '../services/page.service';

@Injectable({
  providedIn: 'root'
})
export class PageNameResolver implements Resolve<boolean> {

  constructor(private pageService: PageService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const correntPage: string = state.url;

    let pageName: string = '';

    switch(correntPage){
      case "/customers":
        pageName = 'Customers';
        break;
      case "/customers/orders":
        pageName = 'Orders';
        break;
      case "/customers/customer/add":
        pageName = 'Add Customer';
        break;
      default:
        pageName = 'Customer Information';
        break;
    }

    this.pageService.initPageName(pageName);

    return of(true);
  }
}
