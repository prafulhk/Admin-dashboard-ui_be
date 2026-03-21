import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { Table } from '../../shared/components/table/table';
import { Modal } from '../../shared/components/modal/modal';
import { FormsModule } from '@angular/forms';
import { Charts } from '../../shared/components/charts/charts';
import { ToastService } from '../../core/services/toast-service';
import { Toast } from '../../shared/components/toast/toast/toast';
import { Skeleton } from '../../shared/components/skeleton/skeleton';

import { User, UserService } from '../../core/services/user-service';
import { Store } from '@ngrx/store';
import { addUser, loadUsers, deleteUser, updateUser } from '../../store/users/users.actions';
import { selectAllUsers } from '../../store/users/users.selectors';
import { selectUserRole } from '../../store/auth/auth.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [Card, Table, Modal, FormsModule, Charts, Toast, Skeleton, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  isModalOpen = false;
  isEditMode = false;
  editIndex = -1;
  deleteIndex = -1;
  deleteId: string = '';
  isDeleteModalOpen = false;
  pieChartLabel = ['Admin', 'Editor', 'User'];
  lineChartLabel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  toastTimer: any;
  columns = ['Name', 'Email', 'Role', 'Status'];
  searchText = '';
  isLoading = false;
  filteredUsers: User[] = [];
  roleChartData: number[] = [0, 0, 0];
  newUser = {
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
    _id: '',
  };
  users: User[] = [];
  role$: any;

  constructor(
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
    private store: Store,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.role$ = this.store.select(selectUserRole);
    this.role$.subscribe((role: any) => console.log('User Role:', role));

    this.store.dispatch(loadUsers());

    this.store.select(selectAllUsers).subscribe((users) => {
      this.users = users;
      console.log('this.users:', this.users);
      this.filteredUsers = users;
      this.roleChartData = this.calculateRoleStats(users);
      console.log(this.roleChartData);
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  openModal() {
    this.isEditMode = false;

    this.newUser = {
      name: '',
      email: '',
      role: 'User',
      status: 'Active',
      _id: '',
    };

    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  editUser(user: any, index: number) {
    this.newUser = { ...user };

    this.isEditMode = true;
    this.editIndex = index;

    this.isModalOpen = true;
  }

  saveUser() {
    if (this.isEditMode) {
      this.userService.updateUser(this.newUser._id, this.newUser).subscribe((updatedUser) => {
        if (updatedUser) {
          this.store.dispatch(
            updateUser({
              index: this.editIndex,
              user: updatedUser,
            }),
          );
          this.toast.show('User Updated');
        } else {
          this.toast.show('Failed to update user');
        }
      });
    } else {
      this.userService.addUser(this.newUser).subscribe((createdUser) => {
        if (createdUser) {
          this.store.dispatch(addUser({ user: createdUser }));
          this.toast.show('User Added');
        } else {
          this.toast.show('Failed to add user');
        }
      });
    }

    this.closeModal();
  }

  confirmDelete(event: any) {
    this.deleteIndex = event.index;
    this.deleteId = event.row._id;
    this.isDeleteModalOpen = true;
  }

  deleteUser() {
    this.userService.deleteUser(this.deleteId).subscribe(() => {
      this.store.dispatch(deleteUser({ index: this.deleteIndex }));
      this.isDeleteModalOpen = false;
      this.toast.show('User Deleted');
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

  getTotalUsers() {
    return this.users.length;
  }

  getAdminCount() {
    return this.users.filter((user) => user.role === 'Admin').length;
  }

  getActiveUsers() {
    return this.users.filter((user) => user.status === 'Active').length;
  }

  onSearch() {
    const search = this.searchText.toLowerCase();

    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search) ||
        user.status.toLowerCase().includes(search),
    );
  }
}
