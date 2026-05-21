import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, ReactiveFormsModule, BsDropdownModule, NgClass],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private fb = inject(FormBuilder);
  private loginService = inject(AuthService);

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
    console.log(creds);
    this.loginService.login(creds).subscribe({
      next: (response) => { console.log(response) },
      error: (error) => { alert(error.message); }
    });
  }
}
