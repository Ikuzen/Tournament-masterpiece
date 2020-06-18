import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './user';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: { headers: HttpHeaders }
  constructor(private http: HttpClient, private loginService: LoginService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginService.getToken()}`
      })
    };
  }

  create(user: User) {
    return this.http.post<User>('http://localhost:3000/user', user, this.httpOptions);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user', this.httpOptions);

  }
  getById(id: string) {
    return this.http.get<User>(`http://localhost:3000/user/${id}`, this.httpOptions);
  }

  getByName(username: string) {
    return this.http.get<User>(`http://localhost:3000/user/username/${username}`, this.httpOptions);
  }

  update(id: string, user: User) {
    return this.http.put<User>(`http://localhost:3000/user/${id}`, user, this.httpOptions);

  }
  deleteById(id: string) {
    return this.http.delete<User>(`http://localhost:3000/user/${id}`, this.httpOptions);

  }
  deleteAll() {
    return this.http.delete<User>('http://localhost:3000/user', this.httpOptions);
  }
}
