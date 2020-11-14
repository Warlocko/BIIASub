import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCuentasComponent } from './admin-cuentas.component';

describe('AdminCuentasComponent', () => {
  let component: AdminCuentasComponent;
  let fixture: ComponentFixture<AdminCuentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCuentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
