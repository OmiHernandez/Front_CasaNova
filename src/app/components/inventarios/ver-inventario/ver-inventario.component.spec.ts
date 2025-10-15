import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInventarioComponent } from './ver-inventario.component';

describe('VerInventarioComponent', () => {
  let component: VerInventarioComponent;
  let fixture: ComponentFixture<VerInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerInventarioComponent]
    });
    fixture = TestBed.createComponent(VerInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
