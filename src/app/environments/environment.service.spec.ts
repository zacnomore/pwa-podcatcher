import { TestBed } from '@angular/core/testing';

import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnvironmentService = TestBed.inject(EnvironmentService);
    expect(service).toBeTruthy();
  });
});
