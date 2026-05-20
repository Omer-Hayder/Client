import { Routes } from '@angular/router';
import { EmployeeList } from './employee/employee-list/employee-list';
import { EmployeeForm } from './employee/employee-form/employee-form';
import { EmployeeDetails } from './employee/employee-details/employee-details';

export const routes: Routes = [
    { path: '', redirectTo: 'employee-list', pathMatch: 'full' },
    { path: 'employee-list', component: EmployeeList },
    { path: 'employee-form', component: EmployeeForm },
    { path: 'employee-details/:id', component: EmployeeDetails }
];
