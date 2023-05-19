import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomePage} from "../../pages/user/home/home.page";
import {async} from "rxjs";

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  // @ts-ignore
  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
