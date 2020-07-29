import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../reducers/login-page.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        StoreModule.forRoot({State: reducer}),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers:[
        MessageService
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
