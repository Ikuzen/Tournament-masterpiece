import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BracketTreeComponent } from './shared/components/bracket-tree/bracket-tree.component';
import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';
import { MainComponent } from './pages/main/main.component';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { NavbarBottomComponent } from './components/navbar-bottom/navbar-bottom.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BracketTreeComponent,
    MainComponent,
    NavbarTopComponent,
    NavbarBottomComponent
  ],
  imports: [
    BrowserModule,
    TreeModule,
    AppRoutingModule,
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
