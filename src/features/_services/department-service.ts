import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { DepartmentDto } from '../_models/department-dto';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private httpClient = inject(HttpClient);

  private url = environment.apiUrl + "/api/Departments";

  getDepartments(): Observable<DepartmentDto[]> {
    return this.httpClient.get<DepartmentDto[]>(this.url);
  }

}
