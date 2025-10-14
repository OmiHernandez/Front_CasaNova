import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadmapaComponent } from './uploadmapa.component';

describe('UploadmapaComponent', () => {
  let component: UploadmapaComponent;
  let fixture: ComponentFixture<UploadmapaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadmapaComponent]
    });
    fixture = TestBed.createComponent(UploadmapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
