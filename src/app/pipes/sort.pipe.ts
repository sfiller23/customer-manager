import { Pipe, PipeTransform } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Customer } from '../interfaces/customer';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  constructor(private ordersService: OrdersService){

  }


  transform(value: any[], args1: string, args2: string): any {
    if(!value)return null;
    if(!args1)return value;
    console.log(args1,'from pipe');
    const sumsMap: Map<number, Customer> = new Map<number, Customer>();
    let sumsArr: number[] = [];

    switch(args1){
      case 'firstName':
        console.log(args1,'from pipe2');
        value = value.sort(function (a:Customer, b: Customer) {
          if(args2==='ACN'){
            if (a.firstName > b.firstName) return 1;
            if (a.firstName < b.firstName) return -1;
          }else{
            if (a.firstName > b.firstName) return -1;
            if (a.firstName < b.firstName) return 1;
          }
          return 0;
        })
        break;
      case 'lastName':
        value = value.sort(function (a: Customer, b: Customer) {
          if(args2==='ACN'){
            if (a.lastName > b.lastName) return 1;
            if (a.lastName < b.lastName) return -1;
          }else{
            if (a.lastName > b.lastName) return -1;
            if (a.lastName < b.lastName) return 1;
          }
          return 0;
        })
        break;
        case 'gender':
          value = value.sort(function (a: Customer, b: Customer) {
            if(args2==='ACN'){
              if (a.gender > b.gender) return 1;
              if (a.gender < b.gender) return -1;
            }else{
              if (a.gender > b.gender) return -1;
              if (a.gender < b.gender) return 1;
            }
            return 0;
          })
          break;
      case 'address':
        value = value.sort(function (a: Customer, b: Customer) {
          if(args2==='ACN'){
            if (a.address > b.address) return 1;
            if (a.address < b.address) return -1;
          }else{
            if (a.address > b.address) return -1;
            if (a.address < b.address) return 1;
          }
          return 0;
        })
        break;
      case 'city':
        value = value.sort(function (a: Customer, b: Customer) {
          if(args2==='ACN'){
            if (a.city > b.city) return 1;
            if (a.city < b.city) return -1;
          }else{
            if (a.city > b.city) return -1;
            if (a.city < b.city) return 1;
          }
          return 0;
        })
      break;
      case 'country':
        value = value.sort(function (a: Customer, b: Customer) {
          if(args2==='ACN'){
            if (a.country > b.country) return 1;
            if (a.country < b.country) return -1;
          }else{
            if (a.country > b.country) return -1;
            if (a.country < b.country) return 1;
          }
          return 0;
        })
        break;
      case 'totalSum':
        value.forEach(customer=>{
          this.ordersService.orderTotalSum(customer.products).subscribe(totalSum=>{
            sumsMap.set(totalSum, customer);
            sumsArr.push(totalSum);
          });
        });
        sumsArr.sort(function (a: number, b: number) {
          if(args2==='ACN'){
            return a-b;
          }else{
            return b-a;
          }
        });
        console.log(sumsArr);

        let customerOrder: any[] = [];

        for(let sum of sumsArr){
          if(sum){
            customerOrder.unshift(sumsMap.get(sum));
          }
        }

        value = customerOrder;

        break;
      default:
        ///
        break;

    }

    return value;
  }
}
