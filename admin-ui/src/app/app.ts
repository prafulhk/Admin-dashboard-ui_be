import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './layout/layout';
import { ThemeService } from './core/services/theme-service';
import { Toast } from './shared/components/toast/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-admin-ui');
  constructor(private theme: ThemeService) {}

  ngOnInit() {
    this.theme.initTheme();
  }
}
