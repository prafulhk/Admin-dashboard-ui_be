import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { LayoutService } from '../../core/services/layout-service';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme-service';
import { logout } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  title = 'Dashboard';
  @Output() toggleMobileSidebar = new EventEmitter<void>();
  constructor(
    private layout: LayoutService,
    public router: Router,
    private theme: ThemeService,
    private store: Store,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

        if (url.includes('dashboard')) {
          this.title = 'Dashboard';
        }

        if (url.includes('users')) {
          this.title = 'Users';
        }

        if (url.includes('settings')) {
          this.title = 'Settings';
        }
      }
    });
  }

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
