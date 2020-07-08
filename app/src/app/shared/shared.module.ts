import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BracketTreeComponent } from './components/bracket-tree/bracket-tree.component';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    BracketTreeComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    TreeModule,
    ButtonModule
  ],
  exports:[
    BracketTreeComponent,
    ToastModule,
  ]
})
export class SharedModule { }
