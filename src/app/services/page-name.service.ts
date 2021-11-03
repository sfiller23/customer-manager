import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageNameService {

  private pageSubject = new BehaviorSubject<string>('');
  page$: Observable<string> = this.pageSubject.asObservable();

  constructor() {

   }

  initPageName(pageName: string){
    console.log(pageName, 'from service');
      this.pageSubject.next(pageName);
  }
}
