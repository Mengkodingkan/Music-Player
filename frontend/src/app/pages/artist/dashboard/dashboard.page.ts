import {Component, OnInit} from '@angular/core';
import {SongModel} from "../../../model/song.model";
import {ApiArtistService} from "../../../services/api-artist.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  information: any;
  reqUpload: SongModel[];
  popularSong: SongModel[];

  constructor(
    private apiArtist: ApiArtistService
  ) {

  }

  ngOnInit() {
    this.apiArtist.fetchDataDashboard();
    this.apiArtist.dashboardInformation.subscribe(data => this.information = data);
    this.apiArtist.requestUpload.subscribe(reqUp => this.reqUpload = reqUp);
    this.apiArtist.popularSongs.subscribe(popSong => this.popularSong = popSong);
  }

}
