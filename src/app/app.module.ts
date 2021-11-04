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
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { InnerNavComponent } from './customers/inner-nav/inner-nav.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    ViewOrdersComponent,
    ViewNavComponent,
    MainNavComponent,
    CustomersComponent,
    CustomerCardComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    ViewCustomerComponent,
    InnerNavComponent,
    SearchFilterPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    EditCustomerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
