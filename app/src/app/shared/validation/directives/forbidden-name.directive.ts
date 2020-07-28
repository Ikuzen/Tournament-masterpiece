import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { defaultIfEmpty } from 'rxjs/internal/operators/defaultIfEmpty';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appForbiddenName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true }]
})
export class ForbiddenValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    throw new Error("Method not implemented.");
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }
  @Input('appForbiddenName') forbiddenName: string;


}

export function forbiddenNameValidator(name: string): Observable<{ [key: string]: boolean } | null> {
  return this.userService.getByName(name).pipe(
    filter(x => !!x ? null : {forbiddenNameValidator:true}),
    defaultIfEmpty(null),
  )
}