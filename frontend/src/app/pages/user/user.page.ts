import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs} from "@ionic/angular";
import {SongService} from "../../services/song.service";
import {SongModel} from "../../models/song.model";
import {AlbumModel} from "../../models/album.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
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
