import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AlbumModel} from "../../../model/album.model";
import {SongModel} from "../../../model/song.model";
import {ApiArtistService} from "../../../services/api-artist.service";
import {NewAlbumComponent} from "../new-album/new-album.component";

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
    private apiArtist: ApiArtistService
  ) {
  }

  ngOnInit() {
    this.apiArtist.fetchAllAlbums();
    this.apiArtist.albums.subscribe(album => this.albums = album);
    this.apiArtist.songs.subscribe(songs => this.songs = songs);
  }

  onCreateAlbum() {
    this.modalCtrl.create({
      component: NewAlbumComponent
    }).then(modalEl => {
      modalEl.present();
    });
  }

}
