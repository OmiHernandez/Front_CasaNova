import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioDisponibleComponent } from './inventario-disponible.component';

describe('InventarioDisponibleComponent', () => {
  let component: InventarioDisponibleComponent;
  let fixture: ComponentFixture<InventarioDisponibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioDisponibleComponent]
    });
    fixture = TestBed.createComponent(InventarioDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
