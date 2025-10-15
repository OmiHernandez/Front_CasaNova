import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsAcomuladosComponent } from './leads-acomulados.component';

describe('LeadsAcomuladosComponent', () => {
  let component: LeadsAcomuladosComponent;
  let fixture: ComponentFixture<LeadsAcomuladosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsAcomuladosComponent]
    });
    fixture = TestBed.createComponent(LeadsAcomuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
