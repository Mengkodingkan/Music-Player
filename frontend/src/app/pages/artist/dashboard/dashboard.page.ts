import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/artist/dashboard.service";
import {SongModel} from "../../../model/song.model";

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
    private dashboardService: DashboardService
  ) {

  }

  ngOnInit() {
    this.dashboardService.fetchData();
    this.dashboardService.dInformation.subscribe(information => this.information = information);
    this.dashboardService.dReqUpload.subscribe(reqUpload => this.reqUpload = reqUpload);
    this.dashboardService.dPopSong.subscribe(popularSong => this.popularSong = popularSong);
  }

}
