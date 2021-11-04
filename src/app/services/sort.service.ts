import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private sortSubject = new BehaviorSubject<string>('');
  sort$: Observable<string> = this.sortSubject.asObservable();

  constructor() { }

  setSorting(sortBy: string){
    this.sortSubject.next(sortBy);
  }
}
