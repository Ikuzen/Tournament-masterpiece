import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BracketTreeComponent } from './components/bracket-tree/bracket-tree.component';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { ValidationErrorComponent } from './validation/validation-error/validation-error.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ForbiddenValidatorDirective } from './validation/directives/forbidden-name.directive';
import { PasswordMatchDirective } from './validation/directives/password-match.directive';



@NgModule({
  declarations: [
    BracketTreeComponent,
    ValidationErrorComponent,
    ForbiddenValidatorDirective,
    PasswordMatchDirective
  ],
  imports: [
    CommonModule,
    ToastModule,
    TreeModule,
    ButtonModule,
    MatTooltipModule,
  ],
  exports:[
    BracketTreeComponent,
    ToastModule,
    ValidationErrorComponent
  ]
})
export class SharedModule { }
