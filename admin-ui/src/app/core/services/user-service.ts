import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export interface User {
  name: string;
  email: string;
  role: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private API = 'http://localhost:3000/api/users';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  addUser(user: User) {
    // this.users.push(user);
    return this.http.post<User>(this.API, user);
  }

  updateUser(id: string, user: User) {
    // this.users[index] = user;
    return this.http.put<User>(`${this.API}/${id}`, user);
  }

  deleteUser(id: string) {
    // this.users.splice(index, 1);
    return this.http.delete(`${this.API}/${id}`);
  }
}
