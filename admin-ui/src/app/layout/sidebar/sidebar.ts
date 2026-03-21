import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LayoutService } from '../../core/services/layout-service';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  isOpen = true;
  @Input() isMobileOpen = false;
  constructor(
    private layout: LayoutService,
    public router: Router,
  ) {
    this.layout.sidebarState$.subscribe((state) => {
      this.isOpen = state;
    });
  }
}
