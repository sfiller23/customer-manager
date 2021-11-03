import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../interfaces/customer';

@Component({
  selector: 'app-inner-nav',
  templateUrl: './inner-nav.component.html',
  styleUrls: ['./inner-nav.component.css']
})
export class InnerNavComponent implements OnInit {

  @Input() customer: any;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }





}
