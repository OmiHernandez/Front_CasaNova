import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitrateApartadoComponent } from './hitrate-apartado.component';

describe('HitrateApartadoComponent', () => {
  let component: HitrateApartadoComponent;
  let fixture: ComponentFixture<HitrateApartadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HitrateApartadoComponent]
    });
    fixture = TestBed.createComponent(HitrateApartadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
