import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MusicsPage} from './musics.page';

describe('MusicsPage', () => {
  let component: MusicsPage;
  let fixture: ComponentFixture<MusicsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MusicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
