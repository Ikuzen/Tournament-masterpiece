import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTopComponent } from './navbar-top.component';
import { ComponentsModule } from '../components.module';
import {RouterTestingModule} from 'node_modules/@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/reducers/login-page.reducer';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ToastService } from '../../shared/services/toast.service';

fdescribe('NavbarTopComponent', () => {
  let component: NavbarTopComponent;
  let fixture: ComponentFixture<NavbarTopComponent>;
  let store: Store<any>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTopComponent ],
      imports:
      [
        StoreModule.forRoot({State: reducer}),
        ComponentsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers:[
        MessageService      
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
