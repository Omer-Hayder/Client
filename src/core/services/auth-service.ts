import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  currentUser = signal<User | null>(null);

  private url = environment.apiUrl + "/api/Authentications"

  roles = computed(() => {
    const user = this.currentUser();
    if (user && user.token) {
      const role = JSON.parse(atob(user.token.split(".")[1])).role
      return Array.isArray(role) ? role : [role];
    }
    return [];
  })

  login(model: any) {
    let url = this.url + "/login"
    this.httpClient.post<any>(url, model).pipe(
      map(user => {
        if (user)
          this.setCurrentUser(user)
      })
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUser.update(value => value = null);
  }

}
