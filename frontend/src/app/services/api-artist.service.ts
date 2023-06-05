import {Injectable} from '@angular/core';
import {BehaviorSubject, switchMap, take, tap} from "rxjs";
import {SongModel} from "../model/song.model";
import {HttpClient} from "@angular/common/http";
import {AlbumModel} from "../model/album.model";
import {environment} from "../../environments/environment";
import {ArtistModel} from "../model/artist.model";

@Injectable({
  providedIn: 'root'
})
export class ApiArtistService {
  private _requestUpload = new BehaviorSubject<SongModel[]>([]);
  private _popularSongs = new BehaviorSubject<SongModel[]>([]);
  private _albums = new BehaviorSubject<AlbumModel[]>([]);
  private _album = new BehaviorSubject<AlbumModel>(new AlbumModel());
  private _songs = new BehaviorSubject<SongModel[]>([]);
  private _song = new BehaviorSubject<SongModel>(new SongModel());
  private _account = new BehaviorSubject<ArtistModel>(new ArtistModel());
  private _data = new BehaviorSubject<any>('');

  constructor(
    private http: HttpClient
  ) {

  }

  get requestUpload() {
    return this._requestUpload.asObservable();
  }

  get popularSongs() {
    return this._popularSongs.asObservable();
  }

  get albums() {
    return this._albums.asObservable();
  }

  get album() {
    return this._album.asObservable();
  }

  get songs() {
    return this._songs.asObservable();
  }

  get song() {
    return this._song.asObservable();
  }

  get account() {
    return this._account.asObservable();
  }

  get data() {
    return this._data.asObservable();
  }

  fetchDataDashboard() {
    return this.http.get(environment.ApiURL + '/artist/dashboard', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        this._data.next(resData.data);
      });
  }

  createAlbum(album: AlbumModel, file: any) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', album.title);
    return this.http.post(environment.ApiURL + '/artist/albums', formData, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).pipe(
      switchMap((resData: any) => {
        const albumModel = new AlbumModel();
        albumModel.id = resData.data.id;
        albumModel.title = resData.data.title;
        albumModel.image = resData.data.image;
        this._album.next(albumModel);
        return this.albums;
      }), take(1), tap((albums: any) => {
          let albumModel = new AlbumModel();
          this.album.subscribe(album => albumModel = album);
          this._albums.next(albums.concat(albumModel));
        }
      ));
  }

  fetchAllAlbums() {
    return this.http.get(environment.ApiURL + '/artist/albums', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        let albums: AlbumModel[] = [];
        let songs: SongModel[] = [];
        for (let album of resData.data) {
          let albumModel = new AlbumModel();
          albumModel.id = album.id;
          albumModel.title = album.title;
          albumModel.image = album.image;
          albums.push(albumModel);

          for (let song of album.songs) {
            if (song.status === 'published') {
              let songModel = new SongModel();
              songModel.id = song.id;
              songModel.title = song.title;
              songModel.url = song.audioUrl;
              songModel.duration = song.duration;
              songModel.albumId = song.albumId;
              songModel.releaseDate = new Date(song.release).toLocaleDateString();
              songs.push(songModel);
            }
          }
        }
        this._albums.next(albums);
        this._songs.next(songs);
      });
  }

  fetchAlbumById(albumId: any) {
    return this.http.get(environment.ApiURL + `/artist/albums/${albumId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        let albumModel = new AlbumModel();
        albumModel.id = resData.data.id;
        albumModel.title = resData.data.title;
        albumModel.image = resData.data.image;
        albumModel.publishDate = new Date(resData.data.publishDate).getFullYear().toString();

        let songs: SongModel[] = [];
        for (let song of resData.data.songs) {
          if (song.status === 'published') {
            let songModel = new SongModel();
            songModel.id = song.id;
            songModel.title = song.title;
            songModel.url = song.audioUrl;
            songModel.duration = song.duration;
            songModel.albumId = song.albumId;
            songModel.releaseDate = new Date(song.release).toLocaleDateString();
            songs.push(songModel);
          }
        }
        this._album.next(albumModel);
        this._songs.next(songs);
      });
  }

  deleteAlbum(albumId: any) {
    return this.http.delete(environment.ApiURL + `/artist/albums/${albumId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).pipe(
      switchMap(() => {
        return this.albums
      }),
      take(1),
      tap(albums => {
        this._albums.next(albums.filter(album => album.id !== albumId));
      })
    )
  }

  createSong(albumId: any, song: SongModel, formData: FormData) {
    return this.http.post(environment.ApiURL + `/artist/albums/${albumId}/songs`, formData, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).subscribe();
  }

  fetchSongById(albumId: any, songId: any) {
    return this.http.get<{
      [key: string]: SongModel
    }>(environment.ApiURL + '/albums/' + albumId + '/songs/' + songId + '.json', {})
      .subscribe((resData: any) => {
        let song = new SongModel();
        song.id = songId;
        song.title = resData.song_title;
        song.url = resData.url;
        song.status = resData.status;
        song.likeCount = resData.like_count;
        song.albumId = resData.album.album_id;
        song.albumTitle = resData.album.album_title;
        song.duration = resData.duration;
        song.releaseDate = resData.release_date;
        this._song.next(song);
      });
  }


}
