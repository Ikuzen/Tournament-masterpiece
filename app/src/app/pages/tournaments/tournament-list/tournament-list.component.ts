import { Component, OnInit } from '@angular/core';
import { Tournament, TournamentPages } from '../tournament';
import { Observable, pipe } from 'rxjs';
import { TournamentService } from '../tournament.service';
import { take, tap } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FilterUtils } from 'primeng/utils';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {
  tournaments: TournamentPages;
  sortOptions: SelectItem[];
  gameFilterOptions: SelectItem[] = [];
  gameList: string[];
  gameFilterInput = null;
  statusFilterOptions: SelectItem[] = [];
  statusFilterInput = null;
  sortField: string;
  sortOrder: number;
  filters: string = "";
  params = {game:'',status:''};
  constructor(private tournamentService: TournamentService, private router: Router) {
    // FilterUtils['custom-equals'] = (value, filter): boolean => {
    //   if (filter === undefined || filter === null || filter.trim() === '') {
    //     return true;
    //   }

    //   if (value === undefined || value === null) {
    //     return false;
    //   }

    //   return value.toString() === filter.toString();
    // };
  }

  ngOnInit(): void {
    this.getAllTournaments().pipe(
      take(1)
    ).subscribe((result) => {
      this.tournaments = result;
    });

    this.tournamentService.getAllGames().pipe(
      take(1)
    ).subscribe((games) => {
      for (const game of games) {
        this.gameFilterOptions.push({ label: game, value: game });
      }
    });
    this.sortOptions = [
      { label: 'Most recent', value: '!createdAt' },
      { label: 'Least recent', value: 'createdAt' },
      { label: 'Name', value: 'name' },
      { label: 'Attendance', value: '!size' }
    ];
    this.statusFilterOptions = [
      { label: 'not started', value: 'not started' },
      { label: 'ongoing', value: 'ongoing' },
      { label: 'finished', value: 'finished' }
    ]
  }

  getAllTournaments(): Observable<TournamentPages> {
    return this.tournamentService.getAll(this.params);
  }

  updateTournamentListByGame(param?: string): void{
    this.params.game = param;
    console.log(this.params)
    this.getAllTournaments().subscribe((list)=>{
      this.tournaments = list;
      console.log(this.tournaments)
    })
  }

  updateTournamentListByStatus(param?: string): void{
    this.params.status = param;
    console.log(this.params)
    this.getAllTournaments().subscribe((list)=>{
      this.tournaments = list;
      console.log(this.tournaments)
    })
  }
  onSortChange(event) {
    let value = event.value;
    console.log(value)
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  onFilterChange(event) {
    let value = event.value;
    if (!this.filters.includes(value)) {
      this.filters += ',' + value;
      console.log(this.filters);
    }
  }
  navigateTournament(tournament: Tournament) {
    this.router.navigate(['tournament/' + tournament._id]);
  }
}
