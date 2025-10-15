import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMapasComponent } from './menu-mapas.component';

describe('MenuMapasComponent', () => {
  let component: MenuMapasComponent;
  let fixture: ComponentFixture<MenuMapasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuMapasComponent]
    });
    fixture = TestBed.createComponent(MenuMapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
