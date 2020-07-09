import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { ValidationErrors, FormGroup } from '@angular/forms';
import { RegisterComponent } from '@tn/src/app/pages/register/register.component';

@Component({
  selector: 'validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ValidationErrorComponent implements OnInit {
  @Input() errors: ValidationErrors;
  constructor() { }

  ngOnInit(): void {
  }

}
