import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customerId: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  getId(): void{
    console.log("emited");
  }



}
