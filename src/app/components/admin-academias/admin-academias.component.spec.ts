import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAcademiasComponent } from './admin-academias.component';

describe('AdminAcademiasComponent', () => {
  let component: AdminAcademiasComponent;
  let fixture: ComponentFixture<AdminAcademiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAcademiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAcademiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
