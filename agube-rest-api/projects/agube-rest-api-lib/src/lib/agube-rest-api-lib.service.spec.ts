import { TestBed } from '@angular/core/testing';

import { AgubeRestApiLibService } from './agube-rest-api-lib.service';

describe('AgubeRestApiLibService', () => {
  let service: AgubeRestApiLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgubeRestApiLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
