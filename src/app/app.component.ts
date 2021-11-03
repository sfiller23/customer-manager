import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { PageService } from './services/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Customer-manager';
  page = '';

  constructor(private pageService: PageService){

  }
  ngOnInit(){
    this.pageService.pageName$.subscribe(pageName=>{
      this.page=pageName;
    })

    this.pageService.setPageView('card');
  }

}
