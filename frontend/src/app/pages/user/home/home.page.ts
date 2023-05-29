import {Component, OnInit} from '@angular/core';

import {register} from 'swiper/element/bundle';
import {HowlerJsService} from "../../../services/howler-js.service";
import {SongModel} from "../../../model/song.model";
import {ArtistModel} from "../../../model/artist.model";
import {ApiUserService} from "../../../services/api-user.service";

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  songs: SongModel[];
  artists: ArtistModel[];
  activeSong: SongModel;
  index: any;

  constructor(
    private howler: HowlerJsService,
    private apiUser: ApiUserService
  ) {

  }

  ngOnInit() {
    this.apiUser.fetchHome();

    this.howler.activeSong.subscribe(activeSong => this.activeSong = activeSong);
    this.apiUser.songs.subscribe(songs => this.songs = songs);
    this.apiUser.artists.subscribe(artists => this.artists = artists);
  }

  onAddToQueue(song: SongModel) {

    // const arr = [...song];
    // const index = arr.findIndex((item: any) => item.id === song.id);
    // arr.splice(index, 1);
    // arr.unshift(song);

    this.howler.addToQueue(song);
  }
}
