import {Component, OnInit} from '@angular/core';
import {ApiAdminService} from "../../../services/api-admin.service";
import {SongModel} from "../../../model/song.model";

@Component({
  selector: 'app-request-songs',
  templateUrl: './request-songs.page.html',
  styleUrls: ['./request-songs.page.scss'],
})
export class RequestSongsPage implements OnInit {
  pendingSongs: SongModel[];

  constructor(
    private apiAdmin: ApiAdminService
  ) {
  }

  ngOnInit() {
    this.apiAdmin.fetchPendingSongs();
    this.apiAdmin.pendingSongs.subscribe(songs => this.pendingSongs = songs)
  }

  onAccepted(songId: any) {
    this.apiAdmin.songApprovals(songId, 'approve').subscribe(resData => {
      console.log(resData)
    });
  }

  onRejected(songId: any) {
    this.apiAdmin.songApprovals(songId, 'reject').subscribe(resData => {
      console.log(resData)
    });
  }
}
