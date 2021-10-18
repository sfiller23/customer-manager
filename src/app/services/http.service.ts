import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { environment } from '../../environments/environment';
import {catchError, concatMap, filter, last, map, take, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.model';
import { Product } from '../interfaces/product';

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
  getItems(model:string, ids:string[]): Observable<Product[]>{
    return this.getAll(model).pipe(map(items=>{
      return items.filter(item=>ids.includes(item.id));
    }))
  }
}
