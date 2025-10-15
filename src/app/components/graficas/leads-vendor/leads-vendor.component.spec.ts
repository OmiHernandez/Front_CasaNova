import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsVendorComponent } from './leads-vendor.component';

describe('LeadsVendorComponent', () => {
  let component: LeadsVendorComponent;
  let fixture: ComponentFixture<LeadsVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsVendorComponent]
    });
    fixture = TestBed.createComponent(LeadsVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
