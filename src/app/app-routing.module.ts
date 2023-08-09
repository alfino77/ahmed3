import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './mainLayout/layouts/layouts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { EditCustomersComponent } from './pages/edit-customers/edit-customers.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';

const routes: Routes = [
  {
    path: "",
    component:LayoutsComponent,
    children:[{
      path: "dashboard",
      component:DashboardComponent
    },
    {
      path: "customer",
      component:CustomersComponent
    },
    {
      path: "edit-customer",
      component:EditCustomersComponent
    },
    {
      path: "employee",
      component:EmployeeComponent
    },
    {
      path: "add-employee",
      component:AddEmployeeComponent
    },
    {
      path: "edit-employee/:empID",
      component:EditEmployeeComponent
    }
  
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
