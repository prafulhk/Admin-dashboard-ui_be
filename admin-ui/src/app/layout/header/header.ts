import { ChangeDetectionStrategy, Component, inject, output, Signal } from '@angular/core';
import { LayoutService } from '../../core/services/layout-service';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme-service';
import { logout } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  toggleMobileSidebar = output<void>();
  router = inject(Router);
  layout = inject(LayoutService);
  theme = inject(ThemeService);
  store = inject(Store);

  title: Signal<string> = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => {
        const url = event.urlAfterRedirects;

        if (url.includes('dashboard')) return 'Dashboard';
        if (url.includes('users')) return 'Users';
        if (url.includes('settings')) return 'Settings';
        if (url.includes('activities')) return 'Activities';

        return 'Dashboard';
      }),
    ),
    { initialValue: 'Dashboard' },
  );

  toggleSidebar() {
    this.layout.toggleSidebar();
  }

  toggleTheme() {
    this.theme.toggleTheme();
  }

  logout() {
    this.store.dispatch(logout());
  }
}
