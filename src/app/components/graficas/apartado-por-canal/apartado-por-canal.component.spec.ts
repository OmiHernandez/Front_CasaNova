import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartadoPorCanalComponent } from './apartado-por-canal.component';

describe('ApartadoPorCanalComponent', () => {
  let component: ApartadoPorCanalComponent;
  let fixture: ComponentFixture<ApartadoPorCanalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartadoPorCanalComponent]
    });
    fixture = TestBed.createComponent(ApartadoPorCanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
