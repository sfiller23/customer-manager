import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { environment } from '../../environments/environment';
import {catchError, concatMap, filter, last, map, take, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private genaralService: GeneralService) { }

  getAll(model:string){
    return this.http.get(`${environment.API_END_POINT}/${model}.json`).pipe(map(res=>this.genaralService.apiObjectToArray(res)));
  }
  add(model:string, data: any){
    return this.http.post<{name:string}>(`${environment.API_END_POINT}/${model}.json`,data);
  }

  edit(model:string, data: any, id: string){
    return this.http.put(`${environment.API_END_POINT}/${model}/${id}.json`,data);
  }
  getItem(model:string, id:string): Observable<any>{
    return this.http.get(`${environment.API_END_POINT}/${model}/${id}.json`);
  }

  getItems(model:string, ids:string[]): Observable<Product[]>{
    return this.http.get(`${environment.API_END_POINT}/${model}.json`).pipe(
      map(items=>this.genaralService.apiObjectToArray(items)),
      tap(items=>{
        return items.filter(item=>ids.includes(item.id));
      })
    )
  }

  deleteItem(model:string, id:string){
    return this.http.delete(`${environment.API_END_POINT}/${model}/${id}.json`);
  }

}
