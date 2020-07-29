import { TestBed } from '@angular/core/testing';

import { ValidationErrorsService } from './validation-errors.service';

describe('ValidationErrorsService', () => {
  let service: ValidationErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
