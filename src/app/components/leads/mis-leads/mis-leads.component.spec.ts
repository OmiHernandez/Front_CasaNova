import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisLeadsComponent } from './mis-leads.component';

describe('MisLeadsComponent', () => {
  let component: MisLeadsComponent;
  let fixture: ComponentFixture<MisLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisLeadsComponent]
    });
    fixture = TestBed.createComponent(MisLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
