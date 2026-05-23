import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  private router = inject(Router);

  protected state = signal<any>(null);

  constructor() {
    this.state.set(this.router.currentNavigation()?.extras.state);
  }
}
