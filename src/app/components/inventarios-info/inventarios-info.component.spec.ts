import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosInfoComponent } from './inventarios-info.component';

describe('InventariosInfoComponent', () => {
  let component: InventariosInfoComponent;
  let fixture: ComponentFixture<InventariosInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventariosInfoComponent]
    });
    fixture = TestBed.createComponent(InventariosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
