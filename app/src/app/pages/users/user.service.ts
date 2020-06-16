import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from './user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
   }

   create(user: User){
    return this.http.post<User>('http://localhost:3000/user', user);
   }
   
   getAll(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/user');

   }
   getById(id: string){
    return this.http.get<User>(`http://localhost:3000/user/${id}`);
   }
   
   getByName(username: string){
    return this.http.get<User>(`http://localhost:3000/user/username/${username}`);
   }

   update(id: string, user: User){
    return this.http.put<User>(`http://localhost:3000/user/${id}`,user);

   }
   deleteById(id: string){
    return this.http.delete<User>(`http://localhost:3000/user/${id}`);

   }
   deleteAll(){
    return this.http.delete<User>('http://localhost:3000/user');
   }
}
