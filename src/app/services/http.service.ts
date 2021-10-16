import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { environment } from '../../environments/environment';
import {catchError, concatMap, last, map, take, tap} from 'rxjs/operators';

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
}
