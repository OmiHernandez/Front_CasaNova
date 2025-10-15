import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertirProspectosComponent } from './convertir-prospectos.component';

describe('ConvertirProspectosComponent', () => {
  let component: ConvertirProspectosComponent;
  let fixture: ComponentFixture<ConvertirProspectosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertirProspectosComponent]
    });
    fixture = TestBed.createComponent(ConvertirProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
