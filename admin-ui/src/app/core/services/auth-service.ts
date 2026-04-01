import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserFromToken(): any {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  // getRole(): string | null {
  //   return this.getUserFromToken()?.role || null;
  // }

  getRole(): string | null {
    let token = localStorage.getItem('token');
    const decodedToken: any = token ? jwtDecode(token) : null;
    return decodedToken?.role || null;
  }

  login(data: any) {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }
}
