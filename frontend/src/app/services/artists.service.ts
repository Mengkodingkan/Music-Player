import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  private _data = new BehaviorSubject<any>({});
  data = this._data.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  fetchData() {
    return this.http.get(environment.ApiURL + '/artists/-NW6ubI0ESxeiM0gqV34', {})
      .subscribe((resData: any) => {
        this._data.next(resData);
      });
  }

  findArtistById(id: string) {

    return this.http.get(environment.ApiURL + '/artists/-NW6ubI0ESxeiM0gqV34/data/artists/' + id + '.json', {})
      .subscribe((resData: any) => {
        this._data.next(resData);
      });
  }
}
