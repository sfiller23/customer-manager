import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomersComponent } from './customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';


const routes: Routes = [
  {
    path: '', component: CustomersComponent,
    children: [
      {path: 'add', component:AddCustomerComponent},
      {path: 'edit/:id', component:EditCustomerComponent},
      {path: 'view/:id', component:ViewCustomerComponent},

    ]

  }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class customersngRoutingModule {}
