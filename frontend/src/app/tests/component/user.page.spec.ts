import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserPage} from "../../pages/user/user.page";
import {async} from "rxjs";

describe('UserPage', () => {
  let component: UserPage;
  let fixture: ComponentFixture<UserPage>;

  // @ts-ignore
  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
