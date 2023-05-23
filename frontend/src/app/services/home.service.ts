import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SongModel} from "../model/song.model";
import {ArtistModel} from "../model/artist.model";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(
    private http: HttpClient
  ) {
  }

  private _songs = new BehaviorSubject<SongModel[]>([]);

  get songs() {
    return this._songs.asObservable();
  }

  private _artists = new BehaviorSubject<ArtistModel[]>([]);

  get artists() {
    return this._artists.asObservable();
  }

  fetchData() {
    return this.http.get(environment.ApiURL + '/discovery/-NW7IJAMMxplcT-zC9MT.json', {})
      .subscribe((resData: any) => {
        const songs: SongModel[] = [];
        const artists: ArtistModel[] = [];
        for (let i of resData.data) {
          if (i.songs) {
            for (let song of i.songs) {
              let songModel = new SongModel();
              songModel.id = song.song_id;
              songModel.title = song.song_title;
              songModel.url = song.song_url;
              songModel.albumId = song.album.album_id;
              songModel.likeCount = song.like_count;
              songModel.albumImage = song.album.album_image;
              songModel.artistId = song.artist.artist_id;
              songModel.artistName = song.artist.artist_name;
              songs.push(songModel);
            }
          }
          if (i.artists) {
            for (let artist of i.artists) {
              let artistModel = new ArtistModel();
              artistModel.id = artist.artist_id;
              artistModel.image = artist.artist_image;
              artistModel.name = artist.artist_name;
              artists.push(artistModel);
            }
          }
        }
        this._songs.next(songs);
        this._artists.next(artists);
      });
  }
}
