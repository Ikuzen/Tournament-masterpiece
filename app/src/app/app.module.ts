import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule, combineReducers } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { MyCounterComponent } from './my-counter/my-counter/my-counter.component';
import { reducer } from './reducers/login-page.reducer';
const reducers = combineReducers({
  currentUser: reducer
})

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'Tournament-Masterpiece',
      maxAge: 50,
    }),
  ],
    
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
