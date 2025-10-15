import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotarialfirmadaComponent } from './notarialfirmada.component';

describe('NotarialfirmadaComponent', () => {
  let component: NotarialfirmadaComponent;
  let fixture: ComponentFixture<NotarialfirmadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotarialfirmadaComponent]
    });
    fixture = TestBed.createComponent(NotarialfirmadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
