import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProjectDto } from '../_models/project-dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private httpClient = inject(HttpClient);

  private url = environment.apiUrl + "/api/Projects";

  getProjects(): Observable<ProjectDto[]> {
    return this.httpClient.get<ProjectDto[]>(this.url);
  }
}
