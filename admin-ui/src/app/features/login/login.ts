import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthError, selectIsLoading } from '../../store/auth/auth.selectors';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, AsyncPipe, ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  isLoading$!: Observable<boolean>;
  loginForm!: FormGroup;
  error$!: Observable<string | null>;

  constructor(
    private router: Router,
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const token = localStorage.getItem('token');
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectAuthError);

    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(
      AuthActions.login({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      }),
    );
  }
}
