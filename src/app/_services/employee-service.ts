import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDto } from '../_models/employee-dto';
import { environment } from '../../environments/environment.development';
import { EmpDetailsDto } from '../_models/emp-details-dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private httpClient = inject(HttpClient);

  private url = environment.apiUrl + "/api/Employees";

  getEmployees(): Observable<EmployeeDto[]> {
    return this.httpClient.get<EmployeeDto[]>(this.url);
  }

  getEmployeeById(id: number): Observable<EmpDetailsDto> {
    return this.httpClient.get<EmpDetailsDto>(`${this.url}/${id}`);
  }

  createEmployee(employee: any) {
    return this.httpClient.post(this.url, employee);
  }

  //constructor(private httpClient: HttpClient){}
}
