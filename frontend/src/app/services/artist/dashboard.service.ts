import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../environments/environment";
import {SongModel} from "../../model/song.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _dInformation = new BehaviorSubject<any>('');
  private _dReqUpload = new BehaviorSubject<SongModel[]>([]);
  private _dPopSong = new BehaviorSubject<SongModel[]>([]);

  constructor(
    private http: HttpClient
  ) {
  }

  get dInformation() {
    return this._dInformation.asObservable();
  }

  get dReqUpload() {
    return this._dReqUpload.asObservable();
  }

  get dPopSong() {
    return this._dPopSong.asObservable();
  }

  fetchData() {
    return this.http.get(environment.ApiURL + '/artist/dashboard/-NWTq_xmcZCNuNxWFO-0.json', {})
      .subscribe((resData: any) => {
        let reqSong: SongModel[] = [];
        let popSong: SongModel[] = [];
        for (let i of resData.data) {
          if (i.information) {
            this._dInformation.next(i.information);
          } else if (i.request_upload) {
            for (let song of i.request_upload) {
              let songModel = new SongModel();
              songModel.id = song.song_id;
              songModel.title = song.song_title;
              songModel.url = song.url;
              songModel.status = song.status;
              songModel.likeCount = song.likeCount;
              songModel.albumId = song.album.album_id;
              songModel.albumTitle = song.album.album_title;
              reqSong.push(songModel)
            }
          } else if (i.popular_song) {
            for (let song of i.popular_song) {
              let songModel = new SongModel();
              songModel.id = song.song_id;
              songModel.title = song.song_title;
              songModel.url = song.url;
              songModel.status = song.status;
              songModel.likeCount = song.like_count;
              songModel.albumId = song.album.album_id;
              songModel.albumTitle = song.album.album_title;
              popSong.push(songModel)
            }
          }
        }
        this._dReqUpload.next(reqSong);
        this._dPopSong.next(popSong);
      });
  }
}
