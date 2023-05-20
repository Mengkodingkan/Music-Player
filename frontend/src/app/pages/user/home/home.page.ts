import {Component, OnInit} from '@angular/core';

import {register} from 'swiper/element/bundle';
import {HowlerJsService} from "../../../services/howler-js.service";
import song from "../../../../assets/file.json"
import {PlayerCtrlComponent} from "../player-ctrl/player-ctrl.component";

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data: any;
  songOnPlay: any;

  constructor(
    private howler: HowlerJsService
  ) {
  }

  ngOnInit() {
    this.data = song.data;
  }

  // onClick(songs: any, song: any){
  //   const arr = [...songs];
  //   const index = arr.findIndex((item: any) => item.id === song.id);
  //   arr.splice(index, 1);
  //   arr.unshift(song);
  //
  //   this.howler.addToQueueAndPlay(arr)
  // }

  onStartSong(song: any) {
    this.howler.startSong(song);
    this.songOnPlay = song;
  }
}
