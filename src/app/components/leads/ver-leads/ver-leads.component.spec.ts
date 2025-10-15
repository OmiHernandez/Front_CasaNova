import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLeadsComponent } from './ver-leads.component';

describe('VerLeadsComponent', () => {
  let component: VerLeadsComponent;
  let fixture: ComponentFixture<VerLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerLeadsComponent]
    });
    fixture = TestBed.createComponent(VerLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
