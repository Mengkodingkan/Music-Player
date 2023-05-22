import {Injectable} from '@angular/core';
import {BehaviorSubject, map, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private _data = new BehaviorSubject<any>({});
  data = this._data.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  fetchData() {
    return this.http.get(environment.ApiURL + '/playlist/-NW0FapfrXvvrISwBDFc.json', {})
      .subscribe((resData: any) => {
        this._data.next(resData.data);
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
