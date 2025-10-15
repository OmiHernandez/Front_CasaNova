import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLeadComponent } from './register-lead.component';

describe('RegisterLeadComponent', () => {
  let component: RegisterLeadComponent;
  let fixture: ComponentFixture<RegisterLeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterLeadComponent]
    });
    fixture = TestBed.createComponent(RegisterLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
