import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {AlbumService} from "../../../services/artist/album.service";
import {SongModel} from "../../../model/song.model";
import {ActivatedRoute} from "@angular/router";
import {AlbumModel} from "../../../model/album.model";

@Component({
  selector: 'app-request-song',
  templateUrl: './request-song.component.html',
  styleUrls: ['./request-song.component.scss'],
})
export class RequestSongComponent implements OnInit {
  @Input() albumId: any;
  @Input() album: AlbumModel;

  constructor(
    private modalCtrl: ModalController,
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {

  }

  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onRequestSong() {
    let songModel = new SongModel();
    songModel.id = "1";
    songModel.title = "Lagu Asd";
    songModel.url = "assets/songs/Wut da heeeeeeeeeeeeeeel Oooh maa gaaaad No waaayyaayyaaaaae - Sound Effects (HD).mp3";
    songModel.releaseDate = "20-20-1202";
    songModel.duration = 123;
    songModel.likeCount = 123;
    songModel.albumTitle = this.album.title;
    songModel.albumId = this.album.id;

    this.albumService.createSong(this.albumId, songModel).subscribe()
  }
}
