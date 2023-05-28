import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {SongModel} from "../../model/song.model";
import {AlbumModel} from "../../model/album.model";
import {ArtistModel} from "../../model/artist.model";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private _album = new BehaviorSubject<AlbumModel>(new AlbumModel());

  get album() {
    return this._album.asObservable();
  }

  private _songs = new BehaviorSubject<SongModel[]>([]);

  get songs() {
    return this._songs.asObservable();
  }

  private _artist = new BehaviorSubject<ArtistModel>(new ArtistModel());

  get artist() {
    return this._artist.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
  }

  fetchAlbumById(id: string) {

    return this.http.get(environment.ApiURL + '/albums/-NW7WgDGX_cN5q89R7mK/data/' + id + '.json', {})
      .subscribe((resData: any) => {
        const albumModel = new AlbumModel();
        albumModel.id = resData.album_id;
        albumModel.image = resData.album_image;
        albumModel.title = resData.album_title;
        albumModel.publishDate = resData.publish_date;

        const artistModel = new ArtistModel();
        artistModel.id = resData.artist.artist_id;
        artistModel.name = resData.artist.artist_name;

        const songs = [];
        for (let song of resData.songs) {
          let songModel = new SongModel();
          songModel.id = song.song_id;
          songModel.title = song.song_title;
          songModel.url = song.song_url;
          songModel.releaseDate = song.release_date;
          songModel.playlistId = song.playlist.id;
          songModel.userId = song.playlist.user_id;
          songModel.artistId = resData.artist.artist_id;
          songModel.artistName = resData.artist.artist_name;
          songs.push(songModel);
        }
        this._album.next(albumModel);
        this._songs.next(songs);
        this._artist.next(artistModel);
        console.log(this.artist)
      });
  }
}
