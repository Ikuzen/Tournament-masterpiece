import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tournament } from './tournament';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  httpOptions: { headers: HttpHeaders }
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private loginService: LoginService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.localStorageService.getToken()}`
      })
    };
  }

  create(tournament: Tournament) {
    return this.http.post<Tournament>('http://localhost:3000/tournament', tournament, this.httpOptions);
  }

  getAll(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>('http://localhost:3000/tournament');

  }
  getById(id: string) {
    return this.http.get<Tournament>(`http://localhost:3000/tournament/${id}`);
  }

  getByName(name: string) {
    return this.http.get<Tournament>(`http://localhost:3000/tournament/name/${name}`);
  }

  update(id: string, tournament: Tournament) {
    return this.http.put<Tournament>(`http://localhost:3000/tournament/${id}`, tournament, this.httpOptions);
  }

  deleteById(id: string) {
    return this.http.delete<Tournament>(`http://localhost:3000/tournament/${id}`, this.httpOptions);

  }
  deleteAll() {
    return this.http.delete<Tournament>('http://localhost:3000/tournament', this.httpOptions);
  }
}