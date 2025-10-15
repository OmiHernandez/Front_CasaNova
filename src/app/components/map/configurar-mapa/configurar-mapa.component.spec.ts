import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarMapaComponent } from './configurar-mapa.component';

describe('ConfigurarMapaComponent', () => {
  let component: ConfigurarMapaComponent;
  let fixture: ComponentFixture<ConfigurarMapaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurarMapaComponent]
    });
    fixture = TestBed.createComponent(ConfigurarMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
