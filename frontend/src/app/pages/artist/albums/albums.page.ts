import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AlbumService} from "../../../services/artist/album.service";
import {AlbumModel} from "../../../model/album.model";
import {SongModel} from "../../../model/song.model";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {
  albums: AlbumModel[];
  songs: SongModel[];

  constructor(
    private modalCtrl: ModalController,
    private albumService: AlbumService
  ) {
    // setInterval(() => {
    //   console.log(this.songs)
    // }, 1000)
  }

  ngOnInit() {
    this.albumService.fetchAlbum().subscribe();
    this.albumService.albums.subscribe(album => this.albums = album);
    this.albumService.songs.subscribe(songs => this.songs = songs);
  }

}
