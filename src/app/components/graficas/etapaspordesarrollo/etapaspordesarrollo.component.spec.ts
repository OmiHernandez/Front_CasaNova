import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaspordesarrolloComponent } from './etapaspordesarrollo.component';

describe('EtapaspordesarrolloComponent', () => {
  let component: EtapaspordesarrolloComponent;
  let fixture: ComponentFixture<EtapaspordesarrolloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtapaspordesarrolloComponent]
    });
    fixture = TestBed.createComponent(EtapaspordesarrolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
