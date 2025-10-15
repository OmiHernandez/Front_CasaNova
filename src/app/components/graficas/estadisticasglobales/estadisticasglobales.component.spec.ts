import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasglobalesComponent } from './estadisticasglobales.component';

describe('EstadisticasglobalesComponent', () => {
  let component: EstadisticasglobalesComponent;
  let fixture: ComponentFixture<EstadisticasglobalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasglobalesComponent]
    });
    fixture = TestBed.createComponent(EstadisticasglobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
