import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FollowedPage} from './followed.page';

describe('FollowedPage', () => {
  let component: FollowedPage;
  let fixture: ComponentFixture<FollowedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FollowedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
