import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmadoEntregadaComponent } from './firmado-entregada.component';

describe('FirmadoEntregadaComponent', () => {
  let component: FirmadoEntregadaComponent;
  let fixture: ComponentFixture<FirmadoEntregadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmadoEntregadaComponent]
    });
    fixture = TestBed.createComponent(FirmadoEntregadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
