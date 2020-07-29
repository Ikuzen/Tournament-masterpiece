import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './user';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: { headers: HttpHeaders }
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private loginService: LoginService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.localStorageService.getToken()}`
      })
    };
  }

  create(user: User) {
    return this.http.post<User>('http://localhost:3000/user', user);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user');

  }
  getById(id: string) {
    return this.http.get<User>(`http://localhost:3000/user/${id}`);
  }

  getByName(username: string) {
    return this.http.get<User>(`http://localhost:3000/user/username/${username}`);
  }

  update(id: string, user: User) {
    return this.http.put<User>(`http://localhost:3000/user/${id}`, user);

  }
  deleteById(id: string) {
    return this.http.delete<User>(`http://localhost:3000/user/${id}`);

  }
  deleteAll() {
    return this.http.delete<User>('http://localhost:3000/user', this.httpOptions);
  }
}
