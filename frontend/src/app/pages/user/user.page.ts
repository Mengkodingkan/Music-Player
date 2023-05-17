import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs} from "@ionic/angular";
import {TrackService} from "../../services/track.service";
import {TopMusicModel} from "../../models/top-music.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @ViewChild(IonTabs) tabs: IonTabs;
  selected: any;

  track: TopMusicModel;

  constructor(
    private trackService: TrackService
  ) {
  }

  ngOnInit() {
    this.trackService.currentTrack.subscribe(t => this.track = t)
  }

  setSelectedTab() {
    this.selected = this.tabs.getSelected();
  }
}
