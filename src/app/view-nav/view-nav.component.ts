import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService } from '../services/page.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-view-nav',
  templateUrl: './view-nav.component.html',
  styleUrls: ['./view-nav.component.css']
})
export class ViewNavComponent implements OnInit, OnDestroy {

  pageView: any;

  sunscription: Subscription = new Subscription();

  constructor(public pageService: PageService) { }

  ngOnInit(): void {
    this.pageService.pageView$.pipe(first()).subscribe(pageView=>{
      this.pageView = pageView;
    })
  }

  ngOnDestroy(): void{
    this.sunscription.unsubscribe();
  }

}
