import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import {CardModule} from 'primeng/card';

import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { TournamentListComponent } from './tournaments/tournament-list/tournament-list.component';
import { TournamentDetailComponent } from './tournaments/tournament-detail/tournament-detail.component';
import { MainComponent } from './main/main.component';
import { TreeModule } from 'primeng/tree';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { UtilService } from '../shared/services/util.service';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ToastService } from '../shared/services/toast.service';
import {ToastModule} from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import {TooltipModule} from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ValidationErrorsService } from '../shared/validation/services/validation-errors.service';



@NgModule({
  declarations: [UserDetailComponent, UserListComponent, TournamentListComponent, TournamentDetailComponent, MainComponent, LoginComponent, RegisterComponent, PasswordRecoveryComponent, ForbiddenComponent],
  imports: [
    CommonModule,
    CarouselModule,
    CardModule,
    TreeModule,
    HttpClientModule,
    FormsModule,
    MenuModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    SharedModule,
    TooltipModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatFormFieldModule,
  ],
  providers:[LocalStorageService, UtilService, ToastService, ValidationErrorsService],
  exports:[UserDetailComponent, UserListComponent, TournamentListComponent, TournamentDetailComponent, MainComponent]
})
export class PagesModule { }
