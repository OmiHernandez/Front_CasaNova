import { TestBed } from '@angular/core/testing';

import { UploadpdfService } from './uploadpdf.service';

describe('UploadpdfService', () => {
  let service: UploadpdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadpdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
