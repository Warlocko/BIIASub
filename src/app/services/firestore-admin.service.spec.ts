import { TestBed } from '@angular/core/testing';

import { FirestoreAdminService } from './firestore-admin.service';

describe('FirestoreAdminService', () => {
  let service: FirestoreAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
