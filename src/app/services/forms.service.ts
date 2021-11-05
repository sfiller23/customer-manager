import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  toggleBox(input: HTMLInputElement, id: string, form: FormGroup, formArray: any[]){

    const control = new FormControl(id);
    const currentControl = input.value;
    const isChecked = input.toggleAttribute("checked");
    console.log(isChecked);

    if(isChecked){
        (<FormArray>form.get(`${currentControl}`)).push(control);
    }else{
      let updatedArray = formArray.map(item=>{
        if(item !== id){
          return item;
        }
      });
      //undefined clear:
        updatedArray = updatedArray.filter(item=>{
          return item !== undefined;
        });

        form.value.products = updatedArray;

      }
  }
}
