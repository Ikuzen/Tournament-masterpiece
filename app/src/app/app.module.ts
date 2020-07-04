import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { reducer } from './reducers/login-page.reducer';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      State: reducer
    }),
    StoreDevtoolsModule.instrument({
      name: 'Tournament-Masterpiece',
      maxAge: 50,
    }),
  ],
    
  providers: [MessageService],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
