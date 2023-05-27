import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ArtistListPage} from './artist-list.page';

describe('ArtistListPage', () => {
  let component: ArtistListPage;
  let fixture: ComponentFixture<ArtistListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ArtistListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
