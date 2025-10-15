import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaInventarioComponent } from './asigna-inventario.component';

describe('AsignaInventarioComponent', () => {
  let component: AsignaInventarioComponent;
  let fixture: ComponentFixture<AsignaInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignaInventarioComponent]
    });
    fixture = TestBed.createComponent(AsignaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
