import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentNotFoundComponent } from './tournament-not-found.component';

describe('TournamentNotFoundComponent', () => {
  let component: TournamentNotFoundComponent;
  let fixture: ComponentFixture<TournamentNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
