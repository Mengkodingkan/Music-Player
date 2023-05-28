import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ArtistModel} from "../../model/artist.model";
import {AlbumModel} from "../../model/album.model";

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  private _artist = new BehaviorSubject<ArtistModel>(new ArtistModel());

  get artist() {
    return this._artist.asObservable();
  }

  private _albums = new BehaviorSubject<AlbumModel[]>([]);

  get albums() {
    return this._albums.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
  }

  fetchData() {
    return this.http.get(environment.ApiURL + '/artists/-NW6ubI0ESxeiM0gqV34', {})
      .subscribe((resData: any) => {
        this._artist.next(resData);
      });
  }

  fetchArtistById(id: string) {

    return this.http.get(environment.ApiURL + '/artists/-NW7GNEOjCRmkx2UaaGQ/data/artists/' + id + '.json', {})
      .subscribe((resData: any) => {
        const albums = [];

        const artistModel = new ArtistModel();
        artistModel.id = resData.artist_id;
        artistModel.image = resData.artist_image;
        artistModel.name = resData.artist_name;
        artistModel.bio = resData.bio;
        artistModel.fbUrl = resData.fb_url;
        artistModel.igUrl = resData.ig_url;
        artistModel.webUrl = resData.web_url;

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
