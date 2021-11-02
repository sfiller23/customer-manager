import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../interfaces/customer';

@Component({
  selector: 'app-inner-nav',
  templateUrl: './inner-nav.component.html',
  styleUrls: ['./inner-nav.component.css']
})
export class InnerNavComponent implements OnInit {

  @Input() customerId: string = '';

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    console.log(this.customerId,"innerNav");

  }





}
