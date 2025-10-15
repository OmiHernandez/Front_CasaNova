import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesgraficaComponent } from './reportesgrafica.component';

describe('ReportesgraficaComponent', () => {
  let component: ReportesgraficaComponent;
  let fixture: ComponentFixture<ReportesgraficaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesgraficaComponent]
    });
    fixture = TestBed.createComponent(ReportesgraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
