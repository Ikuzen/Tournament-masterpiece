import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../reducers/login-page.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

describe('UserService', () => {
  let service: UserService;

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
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
