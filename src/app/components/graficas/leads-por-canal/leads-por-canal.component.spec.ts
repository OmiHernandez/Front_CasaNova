import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsPorCanalComponent } from './leads-por-canal.component';

describe('LeadsPorCanalComponent', () => {
  let component: LeadsPorCanalComponent;
  let fixture: ComponentFixture<LeadsPorCanalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsPorCanalComponent]
    });
    fixture = TestBed.createComponent(LeadsPorCanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
