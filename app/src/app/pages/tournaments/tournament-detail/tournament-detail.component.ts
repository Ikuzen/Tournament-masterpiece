import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '@reducers/login-page.reducer';
import { userSelector } from '@reducers/login-page.reducer';
import { error } from 'console';
import { UtilService } from '@tn/src/app/shared/services/util.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {
  tournament: Tournament;
  isLoggedIn: boolean;
  isTournamentOwner: boolean = false;
  constructor(private route: ActivatedRoute, private tournamentService: TournamentService, private router: Router, private readonly store: Store<fromAuth.ApplicationState>, public utilService: UtilService) {
    route.params.subscribe((value) => {
      tournamentService.getById(value.tournamentId).pipe(
        take(1)
      ).subscribe((tournament) => {
        this.tournament = tournament;
        this.store.pipe(select(userSelector)).subscribe((appState) => {
          if(appState.currentUser.username){
            this.isLoggedIn = true;
            if(appState.currentUser.username === this.tournament.organizer.username || appState.currentUser.role === 'admin'){ // if owner or admin, has edit rights
              this.isTournamentOwner = true; 
            }
          }else{
            this.isLoggedIn = false;
          }
        },
        (err)=>{
          this.isLoggedIn = false;
        });
      },
      (error)=>{
      });
    });
  }

  ngOnInit(): void {
    
  }

}
