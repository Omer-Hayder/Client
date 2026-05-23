import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, ReactiveFormsModule, BsDropdownModule, NgClass],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  protected loginService = inject(AuthService);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get lf() { return this.loginForm.controls };

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    var creds = this.loginForm.value;

    this.loginService.login(creds).subscribe({
      next: (response) => {
        this.loginForm.reset();
        this.router.navigateByUrl("/employee-list");
      }
    });
  }

  signOut() {
    this.loginService.logout();
    this.router.navigateByUrl("/");
  }
}
