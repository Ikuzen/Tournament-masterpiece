import { Component, OnInit } from '@angular/core';
import { Tournament } from '../tournament';
import { Observable, pipe } from 'rxjs';
import { TournamentService } from '../tournament.service';
import { take, tap } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

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
  constructor(private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.getAllTournaments().pipe(
      take(1),
      tap((result) => {
        this.tournaments = result;
        console.log(this.tournaments)
      })
    ).subscribe();

    this.sortOptions = [
      {label: 'Newest First', value: '!year'},
      {label: 'Oldest First', value: 'year'},
      {label: 'Brand', value: 'brand'}

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
}
