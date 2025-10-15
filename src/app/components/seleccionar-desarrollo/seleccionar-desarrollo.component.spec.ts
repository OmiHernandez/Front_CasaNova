import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarDesarrolloComponent } from './seleccionar-desarrollo.component';

describe('SeleccionarDesarrolloComponent', () => {
  let component: SeleccionarDesarrolloComponent;
  let fixture: ComponentFixture<SeleccionarDesarrolloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionarDesarrolloComponent]
    });
    fixture = TestBed.createComponent(SeleccionarDesarrolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
