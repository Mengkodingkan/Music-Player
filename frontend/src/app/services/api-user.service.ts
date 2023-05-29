import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {SongModel} from "../model/song.model";
import {ArtistModel} from "../model/artist.model";
import {environment} from "../../environments/environment";
import {AlbumModel} from "../model/album.model";

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  private _songs = new BehaviorSubject<SongModel[]>([]);
  private _artists = new BehaviorSubject<ArtistModel[]>([]);
  private _album = new BehaviorSubject<AlbumModel>(new AlbumModel());
  private _albums = new BehaviorSubject<AlbumModel[]>([]);
  private _artist = new BehaviorSubject<ArtistModel>(new ArtistModel());

  get songs() {
    return this._songs.asObservable();
  }

  get artists() {
    return this._artists.asObservable();
  }

  get album() {
    return this._album.asObservable();
  }

  get albums() {
    return this._albums.asObservable();
  }

  get artist() {
    return this._artist.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
  }

  fetchHome() {
    return this.http.get(environment.ApiURL + '/user/discovery/-NWcfV3KsCx3CQEaQZCh.json', {})
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
              artistModel.fullName = artist.artist_name;
              artists.push(artistModel);
            }
          }
        }
        this._songs.next(songs);
        this._artists.next(artists);
      });
  }

  fetchPlaylist() {
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
        this._songs.next(songs);
      });
  }

  fetchAlbumByArtistIdAlbumId(artistId: any, albumId: any) {
    return this.http.get(environment.ApiURL + '/user/artists/' + artistId + '/albums/' + albumId + '.json', {})
      .subscribe((resData: any) => {
        const albumModel = new AlbumModel();
        albumModel.id = resData.album_id;
        albumModel.image = resData.album_image;
        albumModel.title = resData.album_title;
        albumModel.publishDate = resData.publish_date;

        const songs = [];
        for (let song of resData.songs) {
          let songModel = new SongModel();
          songModel.id = song.song_id;
          songModel.title = song.song_title;
          songModel.url = song.song_url;
          songModel.releaseDate = song.release_date;
          songModel.playlistId = song.playlist.id;
          songModel.userId = song.playlist.user_id;
          songs.push(songModel);
        }
        this._album.next(albumModel);
        this._songs.next(songs);
      });
  }

  fetchArtistById(artistId: any) {
    return this.http.get(environment.ApiURL + '/user/artists/' + artistId + '.json', {})
      .subscribe((resData: any) => {
        const albums = [];

        const artistModel = new ArtistModel();
        artistModel.id = resData.artist_id;
        artistModel.image = resData.artist_image;
        artistModel.fullName = resData.artist_name;
        artistModel.bio = resData.bio;

        for (let album of resData.albums) {
          const albumModel = new AlbumModel();
          albumModel.id = album.album_id;
          albumModel.image = album.album_image;
          albumModel.title = album.album_title;
          albumModel.publishDate = album.publish_date;
          albums.push(albumModel);
        }
        this._artist.next(artistModel);
        this._albums.next(albums);
      });
  }
}
