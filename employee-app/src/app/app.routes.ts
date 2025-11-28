import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeAddComponent } from './employees/employee-add/employee-add.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import {HomeComponent} from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employees', canActivate: [AuthGuard], component: EmployeeListComponent },
  { path: 'employees/add', canActivate: [AuthGuard], component: EmployeeAddComponent },
  { path: 'employees/edit/:id', canActivate: [AuthGuard], component: EmployeeEditComponent },
  { path: 'employees/details/:id', canActivate: [AuthGuard], component: EmployeeDetailsComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
