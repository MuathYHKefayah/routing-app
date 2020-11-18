import { TestBed } from '@angular/core/testing';

import { SelectivePreloadingStartegyService } from './selective-preloading-startegy.service';

describe('SelectivePreloadingStartegyService', () => {
  let service: SelectivePreloadingStartegyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectivePreloadingStartegyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
