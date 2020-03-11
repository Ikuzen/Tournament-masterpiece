import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketTreeComponent } from './bracket-tree.component';

describe('BracketTreeComponent', () => {
  let component: BracketTreeComponent;
  let fixture: ComponentFixture<BracketTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BracketTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BracketTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
