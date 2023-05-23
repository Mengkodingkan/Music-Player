import {Injectable} from '@angular/core';
import {BehaviorSubject, map, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SongModel} from "../model/song.model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(
    private http: HttpClient
  ) {
  }

  private _data = new BehaviorSubject<SongModel[]>([]);

  get data() {
    return this._data.asObservable();
  }

  fetchData() {
    return this.http.get(environment.ApiURL + '/playlist/-NW0FapfrXvvrISwBDFc.json', {})
      .subscribe((resData: any) => {
        const songs = [];
        for (let song of resData.data.songs) {
          const songModel = new SongModel();
          songModel.id = song.song_id;
          songModel.title = song.song_title;
          songModel.url = song.song_url;
          songModel.albumId = song.album.album_id;
          songModel.likeCount = song.like_count;
          songModel.albumImage = song.album.album_image;
          songModel.artistId = song.artist.artist_id;
          songModel.artistName = song.artist.artist_name;
          songModel.playlistId = song.playlist.id;
          songModel.userId = song.playlist.user_id;
          songs.push(songModel);
        }
        this._data.next(songs);
      });
  }

  deleteSong(songId: any) {
    // return this.http.delete(environment.ApiURL + '/playlist/-NW0FapfrXvvrISwBDFc/data/songs/' + songId + '.json')
    //   .subscribe((resData: any) => {
    //     this.fetchData();
    //   });
    console.log(songId);
  }

}
