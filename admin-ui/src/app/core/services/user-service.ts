import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../../environment';

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

  private API = `${environment.apiUrl}/users`;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  addUser(user: User) {
    return this.http.post<User>(this.API, user);
  }

  updateUser(id: string, user: User) {
    return this.http.put<User>(`${this.API}/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
