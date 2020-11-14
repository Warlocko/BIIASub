import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrokersComponent } from './admin-brokers.component';

describe('AdminBrokersComponent', () => {
  let component: AdminBrokersComponent;
  let fixture: ComponentFixture<AdminBrokersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBrokersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBrokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
