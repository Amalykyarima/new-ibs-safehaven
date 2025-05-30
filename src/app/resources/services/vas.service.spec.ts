import { TestBed } from '@angular/core/testing';

import { VasService } from './vas.service';

describe('VasService', () => {
  let service: VasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
