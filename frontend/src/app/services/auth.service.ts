import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _data = new BehaviorSubject<any>('');

  get data() {
    return this._data.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
  }

  login(email: string, password: string) {
    return this.http.post(environment.ApiURL + '/auth',
      {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe((resData: any) => {
      this._data.next(resData);
    });
  }
}
