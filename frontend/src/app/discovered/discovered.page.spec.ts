import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DiscoveredPage} from './discovered.page';

describe('DiscoveredPage', () => {
  let component: DiscoveredPage;
  let fixture: ComponentFixture<DiscoveredPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DiscoveredPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
