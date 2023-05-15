import {TestBed} from '@angular/core/testing';

import {FollowingArtistService} from '../following-artist.service';

describe('FollowingService', () => {
  let service: FollowingArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowingArtistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
