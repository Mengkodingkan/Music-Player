import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../../../app.component";
import {BehaviorSubject, map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(
    private http: HttpClient
  ) {
  }

  private _data = new BehaviorSubject<any[]>([]);

  get data() {
    return this._data.asObservable();
  }

  fetchData() {

    // fetch from firebase
    return this.http.get<{ [key: string]: any }>(AppComponent.API_URL + '/discovery.json')
      .pipe(map(resData => {
          const data = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              data.push({
                id: key,
                title: resData[key].data[0].title,

              });
            }
          }
          return data;
        }),
        tap(data => {
          this._data.next(data);
        }))
  }
}
