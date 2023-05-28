import {Component, OnInit} from '@angular/core';
import {AlbumService} from "../../../services/artist/album.service";
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {SongModel} from "../../../model/song.model";

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  song: SongModel;
  songId: any;
  albumId: any;

  constructor(
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {
    // console.log(this.song)
    // setInterval(() => {
    //   this.albumService.fetchSongById(this.albumId, this.songId)
    // }, 1000)
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('songId')) {
        this.navCtrl.navigateBack('/artist/tabs/albums');
        return;
      }

      this.albumId = paramMap.get('albumId');
      this.songId = paramMap.get('songId');

    });

    this.albumService.fetchSongById(this.albumId, this.songId);

    this.albumService.song.subscribe(songs => this.song = songs);
  }

}
