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
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe((resData: any) => {
      console.log(resData);
      this._data.next(resData);
    });
  }

  registerUser(name: string, email: string, password: string) {
    return this.http.post(environment.ApiURL + '/register',
      {
        name: name,
        email: email,
        password: password,
        birthday: '1999-01-01',
        role: 'user'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe()
  }

  registerArtist(name: string, email: string, password: string) {
    return this.http.post(environment.ApiURL + '/register',
      {
        name: name,
        email: email,
        password: password,
        birthday: '1999-01-01',
        role: 'artist'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe()
  }
}
