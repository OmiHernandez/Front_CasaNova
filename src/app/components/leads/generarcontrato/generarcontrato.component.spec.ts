import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarcontratoComponent } from './generarcontrato.component';

describe('GenerarcontratoComponent', () => {
  let component: GenerarcontratoComponent;
  let fixture: ComponentFixture<GenerarcontratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarcontratoComponent]
    });
    fixture = TestBed.createComponent(GenerarcontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
