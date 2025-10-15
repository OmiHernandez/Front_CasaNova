import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapasPorAsesorPorMesComponent } from './etapas-por-asesor-por-mes.component';

describe('EtapasPorAsesorPorMesComponent', () => {
  let component: EtapasPorAsesorPorMesComponent;
  let fixture: ComponentFixture<EtapasPorAsesorPorMesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtapasPorAsesorPorMesComponent]
    });
    fixture = TestBed.createComponent(EtapasPorAsesorPorMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
