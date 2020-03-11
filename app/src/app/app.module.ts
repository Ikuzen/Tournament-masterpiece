import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BracketTreeComponent } from './shared/components/bracket-tree/bracket-tree.component';
import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    BracketTreeComponent
  ],
  imports: [
    BrowserModule,
    TreeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
