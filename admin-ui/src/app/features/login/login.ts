import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthState } from '../../store/auth/auth.selectors';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private store: Store,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/dashboard']);
    }

    this.store.pipe(select(selectAuthState)).subscribe((state: any) => {
      if (state.error) {
        this.toast.showError(state.error); // 🔥 shows "Invalid password"
      }
    });
  }

  login() {
    if (this.email && this.password) {
      this.store.dispatch(
        AuthActions.login({
          email: this.email,
          password: this.password,
        }),
      );
    }
  }
}
