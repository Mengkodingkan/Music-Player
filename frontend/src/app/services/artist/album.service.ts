import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AlbumModel} from "../../model/album.model";
import {BehaviorSubject, switchMap, take, tap} from "rxjs";
import {SongModel} from "../../model/song.model";
import {HowlerJsService} from "../user/howler-js.service";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private _albums = new BehaviorSubject<AlbumModel[]>([]);
  private _songs = new BehaviorSubject<SongModel[]>([]);
  private _song = new BehaviorSubject<SongModel>(new SongModel());
  private _album = new BehaviorSubject<AlbumModel>(new AlbumModel());

  get albums() {
    return this._albums.asObservable();
  }

  get songs() {
    return this._songs.asObservable();
  }

  get song() {
    return this._song.asObservable();
  }

  get album() {
    return this._album.asObservable();
  }

  constructor(
    private http: HttpClient,
    private howl: HowlerJsService
  ) {
  }

  fetchAlbum() {
    return this.http.get(environment.ApiURL + '/artist/albums.json', {}).pipe<{ [key: string]: any }>(tap(resData => {
      let albums: any[] = [];
      let songs: any[] = [];
      for (let key in resData) {
        let albumModel = new AlbumModel();
        albumModel.id = key;
        albumModel.title = resData[key].album_title;
        albumModel.image = resData[key].album_image;

        if (resData[key].songs) {
          for (let song in resData[key].songs) {
            let songModel = new SongModel();
            songModel.id = song;
            songModel.title = resData[key].songs[song].song_title;
            songModel.url = resData[key].songs[song].song_url;
            songModel.duration = resData[key].songs[song].duration;
            songModel.releaseDate = resData[key].songs[song].release_date;
            songModel.albumId = albumModel.id;
            songs.push(songModel);
          }
        }
        albums.push(albumModel);
      }
      this._songs.next(songs);
      this._albums.next(albums);
    }))
  }

  fetchAlbumById(id: string) {

    return this.http.get(environment.ApiURL + '/artist/albums/' + id + '.json', {})
      .subscribe((resData: any) => {
        let albumModel = new AlbumModel();
        albumModel.id = resData.album_id;
        albumModel.title = resData.album_title;
        albumModel.image = resData.album_image;
        albumModel.publishDate = resData.publish_date;
        this._album.next(albumModel);
      });
  }

  createAlbum(album: AlbumModel) {

    let generatedId: any;

    return this.http.post<{ name: string }>(environment.ApiURL + '/artist/albums.json', {
      album_id: album.id,
      album_title: album.title,
      album_image: album.image,
      publish_date: album.publishDate,
      songs: [],
    }).pipe(
      switchMap(resData => {
        generatedId = resData.name;
        return this.albums
      }),
      take(1),
      tap(albums => {
        album.id = generatedId;
        this._albums.next(albums.concat(album));
      })
    );
  }

  deleteAlbum(id: string) {
    return this.http.delete(environment.ApiURL + '/artist/albums/' + id + '.json')
      .pipe(
        switchMap(() => {
          return this.albums
        }),
        take(1),
        tap(albums => {
          this._albums.next(albums.filter(alb => alb.id !== id))
        })
      );
  }

  createSong(id: string, song: SongModel) {
    return this.http.post<{ name: string }>(environment.ApiURL + '/artist/albums/' + id + '/songs.json', {
      song_id: song.id,
      song_title: song.title,
      song_url: song.url,
      release_date: song.releaseDate,
      duration: song.duration,
      like_count: song.likeCount,
      album_title: song.albumTitle,
      album_id: id,
      id: null
    }).pipe(
      switchMap(resData => {
        return this.songs
      }),
      take(1),
      tap(songs => {
        this._songs.next(songs.concat(song));
      })
    );
  }

// TODO Song
  fetchSongs(id: string) {
    return this.http.get(environment.ApiURL + '/artist/albums/' + id + '/songs.json', {}).pipe<{
      [key: string]: any
    }>(tap(resData => {
      let songs: any[] = [];

      for (let key in resData) {
        let songModel = new SongModel();
        songModel.id = key;
        songModel.title = resData[key].song_title;
        songModel.url = resData[key].song_url;
        songModel.duration = resData[key].duration;
        songModel.releaseDate = resData[key].release_date;
        songModel.albumId = resData[key].album_id;
        songs.push(songModel);
      }
      this._songs.next(songs);
    }))
  }

  fetchSongById(albumId: string, songId: string) {

    return this.http.get(environment.ApiURL + '/artist/albums/' + albumId + '/songs/' + songId + '.json', {})
      .subscribe((resData: any) => {
        let songModel = new SongModel();
        songModel.id = songId;
        songModel.title = resData.song_title;
        songModel.url = resData.song_url;
        songModel.releaseDate = resData.release_date;
        songModel.duration = resData.duration;
        songModel.likeCount = resData.like_count;
        songModel.albumId = albumId;
        songModel.albumTitle = resData.album_title;
        this._song.next(songModel);
      });
  }
}
