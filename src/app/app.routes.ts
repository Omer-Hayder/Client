import { Routes } from '@angular/router';
import { EmployeeList } from '../features/employee/employee-list/employee-list';
import { EmployeeForm } from '../features/employee/employee-form/employee-form';
import { EmployeeDetails } from '../features/employee/employee-details/employee-details';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    //{ path: '', component: HomeComponent },
    //{path: '', canActivate: [authGuard]}

    { path: 'employee-list', component: EmployeeList },
    { path: 'employee-form', component: EmployeeForm },
    { path: 'employee-details/:id', component: EmployeeDetails }
    // { path: 'not-found', component: NotFoundComponent },
    // { path: 'server-error', component: ServerErrorComponent },
    //{ path: '**', component: HomeComponent, pathMatch: 'full' },
];
