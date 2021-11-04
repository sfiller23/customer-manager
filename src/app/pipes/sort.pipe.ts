import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;

    console.log(args);

    // let a: string;
     let b: string;
console.log(value);
    switch(args){
      case 'firstName':
        value = value.sort(function (a: any, b: any) {
          if (a.firstName > b.firstName) return 1;
          if (a.firstName < b.firstName) return -1;
          return 0;
        })
        break;
        case 'lastName':
          value = value.sort(function (a: any, b: any) {
            if (a.lastName > b.lastName) return 1;
            if (a.lastName < b.lastName) return -1;
            return 0;
          })
          break;
          case 'address':
            value = value.sort(function (a: any, b: any) {
              if (a.address > b.address) return 1;
              if (a.address < b.address) return -1;
              return 0;
            })
            break;
            case 'city':
              value = value.sort(function (a: any, b: any) {
                if (a.city > b.city) return 1;
                if (a.city < b.city) return -1;
                return 0;
              })
              break;
              case 'country':
                value = value.sort(function (a: any, b: any) {
                  if (a.country > b.country) return 1;
                  if (a.country < b.country) return -1;
                  return 0;
                })
                break;
                case 'totalSum':
                  value = value.sort(function (a: any, b: any) {
                    if (a.totalSum > b.totalSum) return 1;
                    if (a.totalSum < b.totalSum) return -1;
                    return 0;
                  })
                  break;
                default:
                  ///
                  break;

    }

    return value.sort();
  }
}
