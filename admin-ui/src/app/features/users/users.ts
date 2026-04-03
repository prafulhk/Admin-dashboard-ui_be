import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { User, UserService } from '../../core/services/user-service';
import { Store } from '@ngrx/store';
import { selectUserRole } from '../../store/auth/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { addUser, deleteUser, loadUsers, updateUser } from '../../store/users/users.actions';
import { ToastService } from '../../core/services/toast-service';
import { FormsModule } from '@angular/forms';
import { Table } from '../../shared/components/table/table';
import { Modal } from '../../shared/components/modal/modal';
import { Toast } from '../../shared/components/toast/toast/toast';
import { Card } from '../../shared/components/card/card';
import { selectAllUsers } from '../../store/users/users.selectors';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe, Card, Table, Modal, FormsModule, Toast],
  templateUrl: './users.html',
  styleUrl: './users.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Users {
  searchText = '';
  filteredUsers: User[] = [];
  users: User[] = [];
  role$: any;
  isModalOpen = false;
  isEditMode = false;
  newUser = {
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
    _id: '',
  };
  editIndex = -1;
  deleteIndex = -1;
  deleteId: string = '';
  isDeleteModalOpen = false;
  columns = ['Name', 'Email', 'Role', 'Status'];
  isLoading = false;

  constructor(
    private store: Store,
    private userService: UserService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.role$ = this.store.select(selectUserRole);
    this.role$.subscribe((role: any) => console.log('User Role:', role));

    this.store.dispatch(loadUsers());

    this.store.select(selectAllUsers).subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
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
}
