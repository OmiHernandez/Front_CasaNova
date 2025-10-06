import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioFormComponent } from './inventario-form.component';

describe('InventarioFormComponent', () => {
  let component: InventarioFormComponent;
  let fixture: ComponentFixture<InventarioFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioFormComponent]
    });
    fixture = TestBed.createComponent(InventarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
