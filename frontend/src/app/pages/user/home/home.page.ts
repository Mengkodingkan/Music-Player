import {Component, OnInit} from '@angular/core';
import {Howl} from "howler";

import {register} from 'swiper/element/bundle';

register();

import topMusic from '../../../../assets/data/topMusic.json'
import {TrackService} from "../../../services/track.service";
import {TopMusicModel} from "../../../models/top-music.model";
import likedSong from '../../../../assets/data/likedSongs.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data = [{title: "Top Music", playlists: likedSong}]

  constructor(
    private trackService: TrackService
  ) {
  }

  ngOnInit() {
    console.log(this.trackService.currentTrack)
  }

  onCLick(track: TopMusicModel) {
    this.trackService.nextTrack(track)
    let player = new Howl({
      src: [track.songUrl],
      html5: true
    });
    player.play();
  }
}
