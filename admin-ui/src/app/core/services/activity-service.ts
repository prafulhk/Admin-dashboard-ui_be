import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getActivities() {
    return this.http.get<any[]>('http://localhost:3000/api/getActivities');
  }
}
