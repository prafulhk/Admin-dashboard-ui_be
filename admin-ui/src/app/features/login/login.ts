import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthState, selectIsLoading } from '../../store/auth/auth.selectors';
import { ToastService } from '../../core/services/toast-service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  isLoading$!: Observable<boolean>;
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private store: Store,
    private toast: ToastService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const token = localStorage.getItem('token');
    this.isLoading$ = this.store.select(selectIsLoading);

    if (token) {
      this.router.navigate(['/dashboard']);
    }

    this.store.pipe(select(selectAuthState)).subscribe((state: any) => {
      if (state.error) {
        this.toast.showError(state.error);
      }
    });
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
