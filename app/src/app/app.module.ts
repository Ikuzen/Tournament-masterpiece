import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BracketTreeComponent } from './shared/components/bracket-tree/bracket-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    BracketTreeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
