import { Component, OnInit } from '@angular/core';
import { Tournament } from '../tournament';
import { Observable, pipe } from 'rxjs';
import { TournamentService } from '../tournament.service';
import { take, tap } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {
  tournaments: Tournament[];
  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  constructor(private tournamentService: TournamentService, private router: Router) { }

  ngOnInit(): void {
    this.getAllTournaments().pipe(
      take(1),
      tap((result) => {
        this.tournaments = result;
      })
    ).subscribe();

    this.sortOptions = [
      {label: 'Most recent', value: '!createdAt'},
      {label: 'Least recent', value: 'createdAt'},
      {label: 'Name', value: 'name'},
      {label: 'Attendance', value: 'size'}

    ];
  }

  getAllTournaments(): Observable<Tournament[]> {
    return this.tournamentService.getAll()
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }
  navigateTournament(tournament: Tournament){
    this.router.navigate(['tournament/'+ tournament._id]);
  }
}
