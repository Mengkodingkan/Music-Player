import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {SongModel} from "../../../model/song.model";
import {ApiArtistService} from "../../../services/api-artist.service";

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
    private apiArtist: ApiArtistService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {

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

    this.apiArtist.fetchSongById(this.albumId, this.songId);

    this.apiArtist.song.subscribe(songs => this.song = songs);
  }

}
