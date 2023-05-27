import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SongRequestPage} from './song-request.page';

describe('SongRequestPage', () => {
  let component: SongRequestPage;
  let fixture: ComponentFixture<SongRequestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SongRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
