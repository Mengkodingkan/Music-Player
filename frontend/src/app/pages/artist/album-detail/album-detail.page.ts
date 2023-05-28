import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {RequestSongComponent} from "../request-song/request-song.component";
import {AlbumService} from "../../../services/artist/album.service";
import {AlbumModel} from "../../../model/album.model";
import {ActivatedRoute} from "@angular/router";
import {SongModel} from "../../../model/song.model";

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.page.html',
  styleUrls: ['./album-detail.page.scss'],
})
export class AlbumDetailPage implements OnInit {
  album: AlbumModel;
  albumId: any;
  songs: SongModel[];

  constructor(
    private modalCtrl: ModalController,
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {
    // setInterval(() => {
    //   console.log(this.songs)
    // }, 1000)
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {

      if (!paramMap.has('albumId')) {
        this.navCtrl.navigateBack('/artist/tabs/albums');
        return;
      }

      // @ts-ignore
      this.albumService.fetchAlbumById(paramMap.get('albumId'));

      this.albumId = paramMap.get('albumId');

    });

    this.albumService.fetchSongs(this.albumId).subscribe();

    this.albumService.album.subscribe(album => this.album = album);
    this.albumService.songs.subscribe(songs => this.songs = songs);
  }

  onCreateModal() {
    this.modalCtrl
      .create({
        component: RequestSongComponent,
        componentProps: {albumId: this.albumId, album: this.album}
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resData => {
        console.log(resData.data, resData.role);
        if (resData.role === 'confirm') {
          console.log('BOOKED!')
        }
      })
  }

  onDeleteAlbum() {
    this.activatedRoute.paramMap.subscribe(paramMap => {

      if (!paramMap.has('albumId')) {
        this.navCtrl.navigateBack('/artist/tabs/albums');
        return;
      }

      // @ts-ignore
      this.albumService.deleteAlbum(paramMap.get('albumId')).subscribe(() => {
        this.navCtrl.navigateBack('/artist/tabs/albums');
      })

    });

  }
}
