import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsMesComponent } from './leads-mes.component';

describe('LeadsMesComponent', () => {
  let component: LeadsMesComponent;
  let fixture: ComponentFixture<LeadsMesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsMesComponent]
    });
    fixture = TestBed.createComponent(LeadsMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
