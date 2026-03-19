import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './layout/layout';
import { ThemeService } from './core/services/theme-service';
import { Toast } from './shared/components/toast/toast/toast';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-admin-ui');
  constructor(
    private theme: ThemeService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.theme.initTheme();
    this.store.dispatch(AuthActions.restoreAuth());
  }
}
