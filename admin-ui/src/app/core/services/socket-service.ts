import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { io } from 'socket.io-client';
import { take } from 'rxjs/operators';
import { addUser, deleteUser, updateUser } from '../../store/users/users.actions';
import { selectAllUsers } from '../../store/users/users.selectors';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket = io('http://localhost:3000');

  constructor(private store: Store) {
    // Socket connection even∂ts
    this.listen();

  }
  listen() {
    this.socket.on('connect', () => {
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected from server');
    });

    this.socket.on('connect_error', (error) => {
      console.log('❌ Socket connection error:', error);
    });

    this.socket.on('userAdded', (user) => {
      this.store.dispatch(addUser({ user }));
    });

    this.socket.on('userUpdated', (updatedUser) => {
      this.store.select(selectAllUsers).pipe(take(1)).subscribe(users => {
        const index = users.findIndex(u => u._id === updatedUser._id);
        if (index !== -1) {
          this.store.dispatch(updateUser({ index, user: updatedUser }));
        } else {
        }
      });
    });

    this.socket.on('userDeleted', (userId) => {
      // Get current users state once to find index
      this.store.select(selectAllUsers).pipe(take(1)).subscribe(users => {
        const index = users.findIndex(u => u._id === userId);
        if (index !== -1) {
          this.store.dispatch(deleteUser({ index }));
        } 
      });
    });
  }

}
