import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { NavbarBottomComponent } from './navbar-bottom/navbar-bottom.component';
import {MenubarModule} from 'node_modules/primeng/menubar';
import { MenuModule } from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    NavbarTopComponent,
    NavbarBottomComponent,
    NotFoundComponent],
  imports: [
    CommonModule,
    MenuModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  exports:[
    NavbarTopComponent,
    NavbarBottomComponent
  ]
})
export class ComponentsModule { }
