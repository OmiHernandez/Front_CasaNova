import { TestBed } from '@angular/core/testing';

import { UploadmapService } from './uploadmap.service';

describe('UploadmapService', () => {
  let service: UploadmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
