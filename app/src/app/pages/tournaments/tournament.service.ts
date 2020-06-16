import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tournament } from './tournament';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) {
  }

  create(tournament: Tournament){
   return this.http.post<Tournament>('http://localhost:3000/tournament', tournament);
  }
  
  getAll(): Observable<Tournament[]>{
   return this.http.get<Tournament[]>('http://localhost:3000/tournament');

  }
  getById(id: string){
   return this.http.get<Tournament>(`http://localhost:3000/tournament/${id}`);
  }
  
  getByName(name: string){
   return this.http.get<Tournament>(`http://localhost:3000/tournament/name/${name}`);
  }

  update(id: string, tournament: Tournament){
   return this.http.put<Tournament>(`http://localhost:3000/tournament/${id}`,tournament);
  }

  deleteById(id: string){
   return this.http.delete<Tournament>(`http://localhost:3000/tournament/${id}`);

  }
  deleteAll(){
   return this.http.delete<Tournament>('http://localhost:3000/tournament');
  }
}