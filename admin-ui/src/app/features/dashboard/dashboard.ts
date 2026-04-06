import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { FormsModule } from '@angular/forms';
import { Charts } from '../../shared/components/charts/charts';
import { Skeleton } from '../../shared/components/skeleton/skeleton';
import { User } from '../../core/services/user-service';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../store/users/users.actions';
import { selectAllUsers } from '../../store/users/users.selectors';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [Card, FormsModule, Charts, Skeleton, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  pieChartLabel = ['Admin', 'Editor', 'User'];
  lineChartLabel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  toastTimer: any;
  isLoading = false;
  roleChartData: number[] = [0, 0, 0];
  users$!: Observable<User[]>;
  adminCount$: Observable<number> = new Observable();
  activeUsersCount$: Observable<number> = new Observable();

  constructor(private store: Store) {}

  ngOnInit() {
    this.isLoading = true;
    this.store.dispatch(loadUsers());
    this.store.select(selectAllUsers).subscribe((users) => {
      this.users$ = this.store.select(selectAllUsers);
      this.adminCount$ = this.users$.pipe(
        map((users) => users.filter((u) => u.role.toLowerCase() === 'Admin'.toLowerCase()).length),
      );
      this.activeUsersCount$ = this.users$.pipe(
        map(
          (users) => users.filter((u) => u.status.toLowerCase() === 'Active'.toLowerCase()).length,
        ),
      );
      this.roleChartData = this.calculateRoleStats(users);
      this.isLoading = false;
    });
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
