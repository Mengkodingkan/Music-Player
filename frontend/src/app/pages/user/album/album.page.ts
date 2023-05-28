import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {AlbumsService} from "../../../services/user/albums.service";
import {HowlerJsService} from "../../../services/user/howler-js.service";
import {SongModel} from "../../../model/song.model";
import {AlbumModel} from "../../../model/album.model";
import {ArtistModel} from "../../../model/artist.model";

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  album: AlbumModel;
  songs: SongModel[];
  artist: ArtistModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private albumsService: AlbumsService,
    private howler: HowlerJsService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {

      if (!paramMap.has('albumId')) {
        this.navCtrl.navigateBack('/user/tabs/home');
        return;
      }

      // @ts-ignore
      this.albumsService.fetchAlbumById(paramMap.get('albumId'))

    });

    this.albumsService.album.subscribe(album => this.album = album);
    this.albumsService.songs.subscribe(song => this.songs = song);
    this.albumsService.artist.subscribe(artist => this.artist = artist);
  }

  onAddToQueue(song: SongModel) {
    // const arr = [...song];
    // const index = arr.findIndex((item: any) => item.id === song.id);
    // arr.splice(index, 1);
    // arr.unshift(song);

    this.howler.addToQueue(song);
  }
}
