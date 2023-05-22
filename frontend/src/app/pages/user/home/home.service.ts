import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private _data = new BehaviorSubject<any>({});
  data = this._data.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  fetchData() {
    return this.http.get(environment.ApiURL + '/discovery/-NW0IvMI5bayh64woVwT.json', {})
      .subscribe((resData: any) => {
        this._data.next(resData);
      });
  }
}
