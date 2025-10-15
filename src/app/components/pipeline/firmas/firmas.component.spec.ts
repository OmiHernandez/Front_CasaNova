import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmasComponent } from './firmas.component';

describe('FirmasComponent', () => {
  let component: FirmasComponent;
  let fixture: ComponentFixture<FirmasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmasComponent]
    });
    fixture = TestBed.createComponent(FirmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
