import { TestBed } from '@angular/core/testing';

import { CoursesdataService } from './coursesdata.service';

describe('CoursesdataService', () => {
  let service: CoursesdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
