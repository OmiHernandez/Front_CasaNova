import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmadoNotarialComponent } from './firmado-notarial.component';

describe('FirmadoNotarialComponent', () => {
  let component: FirmadoNotarialComponent;
  let fixture: ComponentFixture<FirmadoNotarialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmadoNotarialComponent]
    });
    fixture = TestBed.createComponent(FirmadoNotarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
