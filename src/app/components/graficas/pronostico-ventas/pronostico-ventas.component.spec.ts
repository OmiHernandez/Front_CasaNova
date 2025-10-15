import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PronosticoVentasComponent } from './pronostico-ventas.component';

describe('PronosticoVentasComponent', () => {
  let component: PronosticoVentasComponent;
  let fixture: ComponentFixture<PronosticoVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PronosticoVentasComponent]
    });
    fixture = TestBed.createComponent(PronosticoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
