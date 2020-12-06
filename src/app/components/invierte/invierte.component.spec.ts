import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvierteComponent } from './invierte.component';

describe('InvierteComponent', () => {
  let component: InvierteComponent;
  let fixture: ComponentFixture<InvierteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvierteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvierteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
