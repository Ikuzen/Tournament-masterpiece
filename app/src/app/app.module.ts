import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BracketTreeComponent } from './shared/components/bracket-tree/bracket-tree.component';
import {TreeModule} from 'primeng/tree';
import { MainComponent } from './pages/main/main.component';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ComponentsModule } from './components/components.module';
import { UsersComponent } from './pages/users/users.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserDetailComponent } from './pages/users/user-detail/user-detail.component';
import { TournamentListComponent } from './pages/tournaments/tournament-list/tournament-list.component';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
