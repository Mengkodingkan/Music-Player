import {Component, OnInit} from '@angular/core';

import {register} from 'swiper/element/bundle';

import {SongService} from "../../../services/song.service";
import {SongModel} from "../../../models/song.model";
import {AlbumService} from "../../../services/album.service";

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  topSongs: any[] = [];

  loadedTopSongs: SongModel[];

  constructor(
    private songService: SongService,
    private albumService: AlbumService
  ) {
  }

  ngOnInit() {
    this.loadedTopSongs = this.songService.topSongs;

    this.topSongs = this.loadedTopSongs.map(song => {
      const album = this.albumService.getAlbumById(song.idAlbumId);
      return {
        ...song,
        album: album
      }
    });
  }
}
