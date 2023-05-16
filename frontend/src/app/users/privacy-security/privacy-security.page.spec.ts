import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PrivacySecurityPage} from './privacy-security.page';

describe('PrivacySecurityPage', () => {
  let component: PrivacySecurityPage;
  let fixture: ComponentFixture<PrivacySecurityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrivacySecurityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
