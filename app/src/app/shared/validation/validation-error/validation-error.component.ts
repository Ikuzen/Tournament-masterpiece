import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, ViewChild } from '@angular/core';
import { ValidationErrors, FormGroup } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';


@Component({
  selector: 'validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ValidationErrorComponent implements OnInit {
  @ViewChild('tooltip') manualTooltip: MatTooltip;

  @Input() errors: ValidationErrors;
  constructor() { }

  ngOnInit(): void {
  }

  showTooltip() {
    this.manualTooltip.show();
  }}
