import {TestBed} from '@angular/core/testing';
import {SongService} from "../../services/song.service";

describe('SongService', () => {
  let service: SongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongService);
  });

  it('getTopMusic', () => {
    expect(service).toBeTruthy();
    console.log(123)
  });
});
