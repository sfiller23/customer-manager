import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { ViewOrdersComponent } from './orders/view-orders/view-orders.component';
import { ViewNavComponent } from './view-nav/view-nav.component';
import { CustomerCardComponent } from './customers/customer-card/customer-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CustomersComponent } from './customers/customers.component';
import { InnerNavComponent } from './customers/inner-nav/inner-nav.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';
import { ViewOrderComponent } from './orders/view-order/view-order.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    ViewOrdersComponent,
    ViewNavComponent,
    MainNavComponent,
    CustomersComponent,
    CustomerCardComponent,
    UpdateCustomerComponent,
    ViewCustomerComponent,
    InnerNavComponent,
    SearchFilterPipe,
    SortPipe,
    ViewOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
