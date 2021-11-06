import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ViewOrdersComponent } from './orders/view-orders/view-orders.component';
import { CustomerCardComponent } from './customers/customer-card/customer-card.component';
import { CustomersComponent } from './customers/customers.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { OrderResolver } from './resolvers/order.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { PageNameResolver } from './resolvers/page-name.resolver';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';
import { ViewOrderComponent } from './orders/view-order/view-order.component';

const routes: Routes = [
  {path: '', redirectTo:'customers', pathMatch: 'full'},
  {path: 'customers',component:CustomerCardComponent,
    resolve: {
      pageName: PageNameResolver,
    }
  },
  {
    path: 'customers/customer', component: CustomersComponent,
    resolve: {
      pageName: PageNameResolver,
    },
    children: [
      {path: 'add', component:UpdateCustomerComponent},
      {path: 'edit/:id', component:UpdateCustomerComponent,
        resolve:{
          customer: CustomerResolver,
        },
      },
      {path: 'view/:id', component:ViewCustomerComponent},
      {path: 'orders/:id', component:ViewOrderComponent},

    ]

  },
  {path: 'customers/orders', component:OrdersComponent,
    resolve: {
      pageName: PageNameResolver,
    }

  },
  {path: 'order/:id', component:ViewOrderComponent},

  //{path: 'customers/customer', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
