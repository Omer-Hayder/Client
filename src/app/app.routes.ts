import { Routes } from '@angular/router';
import { EmployeeList } from '../features/employee/employee-list/employee-list';
import { EmployeeForm } from '../features/employee/employee-form/employee-form';
import { EmployeeDetails } from '../features/employee/employee-details/employee-details';
import { authGuard } from '../core/guards/auth-guard';
import { HomeComponent } from './home-component/home-component';
import { NotFound } from './errors/not-found/not-found';
import { ServerError } from './errors/server-error/server-error';
import { adminGuard } from '../core/guards/admin-guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '', canActivate: [authGuard], children: [
            { path: 'employee-list', component: EmployeeList },
            { path: 'employee-form', component: EmployeeForm },
            { path: 'employee-details/:id', component: EmployeeDetails, canActivate: [adminGuard] }
        ]
    },
    { path: 'not-found', component: NotFound },
    { path: 'server-error', component: ServerError },
    { path: '**', component: HomeComponent, pathMatch: 'full' }
];
