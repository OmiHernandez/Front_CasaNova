import { TestBed } from '@angular/core/testing';

import { PronosticosService } from './pronosticos.service';

describe('PronosticosService', () => {
  let service: PronosticosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PronosticosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
