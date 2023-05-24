import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs} from "@ionic/angular";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {
  @ViewChild(IonTabs) tabs: IonTabs;

  selectedTab: any;

  constructor() {

  }

  ngOnInit() {

  }

  setSelectedTab() {
    this.selectedTab = this.tabs.getSelected();
  }
}
