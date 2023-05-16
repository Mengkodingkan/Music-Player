import {Component, ViewChild} from '@angular/core';
import {IonTabs} from "@ionic/angular";
import {Howl} from "howler";

export interface Track {
  songTitle: string;
  artist: string;
  url: string;
  duration: number;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  @ViewChild(IonTabs) tabs: any;
  selected: any;
  progress = .3;

  setSelectedTab() {
    this.selected = this.tabs.getSelected();
  }

  startTrack() {
    let player = new Howl({
      src: ['./assets/musics/Coldplay - TheScientist.mp3'],
      html5: true
    });
    player.play();
  }
}
