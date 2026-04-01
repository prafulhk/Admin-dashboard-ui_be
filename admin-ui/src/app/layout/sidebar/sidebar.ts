import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../core/services/layout-service';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar implements OnInit {
  isOpen = true;
  @Input() isMobileOpen = false;
  role!: string | null;
  constructor(
    private layout: LayoutService,
    public router: Router,
    public authService: AuthService,
  ) {
    this.layout.sidebarState$.subscribe((state) => {
      this.isOpen = state;
    });
  }

  ngOnInit() {
    this.role = this.authService.getRole();
  }
}
