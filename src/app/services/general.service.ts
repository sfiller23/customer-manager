import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  apiObjectToArray(res: any): any[]{
    console.log(res);
    const postsArray = [];
    for(const key in res){
      if(res.hasOwnProperty(key)){
        postsArray.push({...res[key], id: key});
      }
    }
    return postsArray;
  }
}
