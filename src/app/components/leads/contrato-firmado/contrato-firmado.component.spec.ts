import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoFirmadoComponent } from './contrato-firmado.component';

describe('ContratoFirmadoComponent', () => {
  let component: ContratoFirmadoComponent;
  let fixture: ComponentFixture<ContratoFirmadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContratoFirmadoComponent]
    });
    fixture = TestBed.createComponent(ContratoFirmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
