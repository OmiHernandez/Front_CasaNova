import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartadoPorPrototipoComponent } from './apartado-por-prototipo.component';

describe('ApartadoPorPrototipoComponent', () => {
  let component: ApartadoPorPrototipoComponent;
  let fixture: ComponentFixture<ApartadoPorPrototipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartadoPorPrototipoComponent]
    });
    fixture = TestBed.createComponent(ApartadoPorPrototipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
