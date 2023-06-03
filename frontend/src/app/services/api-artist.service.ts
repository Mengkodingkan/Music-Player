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
  private _dashboardInformation = new BehaviorSubject<any>('');
  private _requestUpload = new BehaviorSubject<SongModel[]>([]);
  private _popularSongs = new BehaviorSubject<SongModel[]>([]);
  private _albums = new BehaviorSubject<AlbumModel[]>([]);
  private _album = new BehaviorSubject<AlbumModel>(new AlbumModel());
  private _songs = new BehaviorSubject<SongModel[]>([]);
  private _song = new BehaviorSubject<SongModel>(new SongModel());
  private _account = new BehaviorSubject<ArtistModel>(new ArtistModel());

  constructor(
    private http: HttpClient
  ) {
  }

  get dashboardInformation() {
    return this._dashboardInformation.asObservable();
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

  fetchDataDashboard() {
    return this.http.get(environment.ApiURL + '/artist/dashboard', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        let reqSongs: SongModel[] = [];
        let popSongs: SongModel[] = [];
        for (let i of resData.data) {
          if (i.information) {
            this._dashboardInformation.next(i.information);
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
              reqSongs.push(songModel)
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
              popSongs.push(songModel)
            }
          }
        }
        this._requestUpload.next(reqSongs);
        this._popularSongs.next(popSongs);
      });
  }

  createAlbum(album: AlbumModel) {
    return this.http.post<{ name: string }>(environment.ApiURL + '/albums.json', {
      album_id: album.id,
      album_title: album.title,
      album_image: album.image,
      publish_date: album.publishDate
    }).pipe(
      switchMap(() => {
        return this.albums
      }),
      take(1),
      tap(albums => {
          this._albums.next(albums.concat(album));
        }
      ));
  }

  fetchAllAlbums() {
    return this.http.get<{ [key: string]: any }>(environment.ApiURL + '/albums.json', {})
      .subscribe((resData: any) => {
        let albums: AlbumModel[] = [];
        let songs: SongModel[] = [];
        for (let key in resData) {
          let album = new AlbumModel();
          album.id = key;
          album.title = resData[key].album_title;
          album.image = resData[key].album_image;
          album.publishDate = resData[key].publish_date;
          albums.push(album);

          for (let song in resData[key].songs) {
            let songModel = new SongModel();
            songModel.id = song;
            songModel.title = resData[key].songs[song].song_title;
            songModel.url = resData[key].songs[song].url;
            songModel.status = resData[key].songs[song].status;
            songModel.likeCount = resData[key].songs[song].like_count;
            songModel.albumId = resData[key].songs[song].album.album_id;
            songModel.albumTitle = resData[key].songs[song].album.album_title;
            songModel.duration = resData[key].songs[song].duration;
            songModel.releaseDate = resData[key].songs[song].release_date;
            songs.push(songModel);
          }
        }
        this._songs.next(songs);
        this._albums.next(albums);
      });
  }

  fetchAlbumById(albumId: any) {
    return this.http.get<{ [key: string]: AlbumModel }>(environment.ApiURL + '/albums/' + albumId + '.json', {})
      .subscribe((resData: any) => {
        let songs: SongModel[] = [];
        let album = new AlbumModel();
        album.id = albumId;
        album.title = resData.album_title;
        album.image = resData.album_image;
        album.publishDate = resData.publish_date;

        for (let song in resData.songs) {
          let songModel = new SongModel();
          songModel.id = song;
          songModel.title = resData.songs[song].song_title;
          songModel.url = resData.songs[song].url;
          songModel.status = resData.songs[song].status;
          songModel.likeCount = resData.songs[song].like_count;
          songModel.albumId = resData.songs[song].album.album_id;
          songModel.albumTitle = resData.songs[song].album.album_title;
          songModel.duration = resData.songs[song].duration;
          songModel.releaseDate = resData.songs[song].release_date;
          songs.push(songModel);
        }
        this._songs.next(songs);
        this._album.next(album);
      });
  }

  deleteAlbum(albumId: any) {
    return this.http.delete(environment.ApiURL + '/albums/' + albumId + '.json', {}).pipe(
      switchMap(() => {
        return this.albums
      }),
      take(1),
      tap(albums => {
        this._albums.next(albums.filter(album => album.id !== albumId));
      })
    )
  }

  createSong(albumId: string, song: SongModel) {
    return this.http.post<{ name: string }>(environment.ApiURL + '/albums/' + albumId + '/songs.json', {
      song_id: song.id,
      song_title: song.title,
      url: song.url,
      status: song.status,
      like_count: song.likeCount,
      duration: song.duration,
      release_date: song.releaseDate,
      album: {
        album_id: song.albumId,
        album_title: song.albumTitle
      }
    }).pipe(
      switchMap(() => {
        return this.songs
      }),
      take(1),
      tap(songs => {
          this._songs.next(songs.concat(song));
        }
      ));
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
