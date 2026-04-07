import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { FormsModule } from '@angular/forms';
import { Charts } from '../../shared/components/charts/charts';
import { Skeleton } from '../../shared/components/skeleton/skeleton';
import { User } from '../../core/services/user-service';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../store/users/users.actions';
import { selectAllUsers } from '../../store/users/users.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [Card, FormsModule, Charts, Skeleton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  store = inject(Store);
  pieChartLabel = ['Admin', 'Editor', 'User'];
  lineChartLabel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  toastTimer: any;
  isLoading = computed(() => this.users().length === 0);
  users$ = this.store.select(selectAllUsers);
  users = toSignal(this.users$, { initialValue: [] });
  adminCount = computed(() => this.users().filter((u) => u.role?.toLowerCase() === 'admin').length);
  activeUsersCount = computed(
    () => this.users().filter((u) => u.status?.toLowerCase() === 'active').length,
  );
  roleChartData = computed(() => this.calculateRoleStats(this.users()));

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }

  calculateRoleStats(users: User[]) {
    const roles = { Admin: 0, Editor: 0, User: 0 };
    users.forEach((user) => {
      if (roles.hasOwnProperty(user.role)) {
        roles[user.role as keyof typeof roles]++;
      }
    });
    return [roles.Admin, roles.Editor, roles.User];
  }
}
