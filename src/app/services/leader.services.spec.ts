import { TestBed } from '@angular/core/testing';

import { LeaderService } from './leader.service';

describe('DishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaderService = TestBed.get(LeaderService);
    expect(service).toBeTruthy();
  });
});
