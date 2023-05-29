import {Injectable} from '@angular/core';
import {BehaviorSubject, switchMap, take, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserModel} from "../model/user.model";
import {ArtistModel} from "../model/artist.model";

@Injectable({
  providedIn: 'root'
})
export class ApiAdminService {
  private _data = new BehaviorSubject<any>({});
  private _users = new BehaviorSubject<UserModel[]>([]);
  private _user = new BehaviorSubject<UserModel>(new UserModel());
  private _artists = new BehaviorSubject<ArtistModel[]>([]);
  private _artist = new BehaviorSubject<ArtistModel>(new ArtistModel());

  get data() {
    return this._data.asObservable();
  }

  get users() {
    return this._users.asObservable();
  }

  get user() {
    return this._user.asObservable();
  }

  get artists() {
    return this._artists.asObservable();
  }

  get artist() {
    return this._artist.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
  }

  fetchDataDashboard() {
    return this.http.get(environment.ApiURL + '/admin/dashboard/-NWXdzOHDXD4E3Wg3oZT.json', {})
      .subscribe((resData: any) => {
        this._data.next(resData.data[0].information);
      });
  }

  fetchAllUsers() {
    return this.http.get(environment.ApiURL + '/users.json', {})
      .subscribe((resData: any) => {
        let users: UserModel[] = [];
        for (let key in resData) {
          let userModel = new UserModel();
          userModel.id = key;
          userModel.email = resData[key].email;
          userModel.password = resData[key].password;
          userModel.fullName = resData[key].full_name;
          userModel.registeredAt = resData[key].registered_at;
          users.push(userModel);
        }
        this._users.next(users);
      });
  }

  fetchUserById(userId: string) {
    return this.http.get(environment.ApiURL + '/users/' + userId + '.json', {})
      .subscribe((resData: any) => {
        let userModel = new UserModel();
        userModel.id = userId;
        userModel.email = resData.email;
        userModel.password = resData.password;
        userModel.fullName = resData.full_name;
        userModel.registeredAt = resData.registered_at;
        this._user.next(userModel);
      });
  }

  createUser(user: UserModel) {
    return this.http.post<{ name: string }>(environment.ApiURL + '/users.json', {
      email: user.email,
      password: user.password,
      full_name: user.fullName,
      registered_at: user.registeredAt,
      user_id: user.id
    }).pipe(
      switchMap(resData => {
        console.log(resData);
        return this.users
      }),
      take(1),
      tap(users => {
        this._users.next(users.concat(user));
      })
    );
  }

  updateUser(user: UserModel) {
    return this.http.patch(environment.ApiURL + '/users/' + user.id + '.json', {
      email: user.email,
      password: user.password
    })
      .pipe(
        switchMap(resData => {
          console.log(resData);
          return this.users
        }),
        take(1),
        tap(users => {
          this._users.next(users.map(u => u.id !== user.id ? u : user));
        })
      );
  }

  deleteUser(userId: string) {
    return this.http.delete(environment.ApiURL + '/users/' + userId + '.json').pipe(
      switchMap(() => {
        return this.users
      }),
      take(1),
      tap(users => {
        this._users.next(users.filter(user => user.id !== userId));
      })
    );
  }

  fetchAllArtists() {
    return this.http.get(environment.ApiURL + '/artists.json', {})
      .subscribe((resData: any) => {
        let artists: ArtistModel[] = [];
        for (let key in resData) {
          let artistModel = new ArtistModel();
          artistModel.id = key;
          artistModel.email = resData[key].artist_email;
          artistModel.password = resData[key].password;
          artistModel.fullName = resData[key].full_name;
          artistModel.registeredAt = resData[key].registered_at;
          artistModel.bio = resData[key].bio;
          artists.push(artistModel);
        }
        this._artists.next(artists);
      });
  }

  fetchArtistById(artistId: string) {
    return this.http.get(environment.ApiURL + '/artists/' + artistId + '.json', {})
      .subscribe((resData: any) => {
        let artistModel = new ArtistModel();
        artistModel.id = artistId;
        artistModel.email = resData.artist_email;
        artistModel.password = resData.password;
        artistModel.fullName = resData.full_name;
        artistModel.registeredAt = resData.registered_at;
        artistModel.bio = resData.bio;
        this._artist.next(artistModel);
      });
  }

  createArtist(artist: ArtistModel) {
    return this.http.post<{ name: string }>(environment.ApiURL + '/artists.json', {
      artist_email: artist.email,
      password: artist.password,
      full_name: artist.fullName,
      registered_at: artist.registeredAt,
      bio: artist.bio,
      artist_id: artist.id
    }).pipe(
      switchMap(resData => {
        console.log(resData);
        return this.artists
      }),
      take(1),
      tap(artists => {
        this._artists.next(artists.concat(artist));
      })
    );
  }

  updateArtist(artist: ArtistModel) {
    return this.http.patch(environment.ApiURL + '/artists/' + artist.id + '.json', {
      artist_email: artist.email,
      password: artist.password,
      bio: artist.bio,
    })
      .pipe(
        switchMap(resData => {
          console.log(resData);
          return this.artists
        }),
        take(1),
        tap(artists => {
          this._artists.next(artists.map(a => a.id !== artist.id ? a : artist));
        })
      );
  }
}
