import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private pageNameSubject = new BehaviorSubject<string>('');
  pageName$: Observable<string> = this.pageNameSubject.asObservable();

  private pageViewSubject = new BehaviorSubject<string>('');
  pageView$: Observable<string> = this.pageViewSubject.asObservable();

  constructor() {

   }

  initPageName(pageName: string){
    this.pageNameSubject.next(pageName);
  }

  setPageView(pageView: string){
    this.pageViewSubject.next(pageView);
  }
}
