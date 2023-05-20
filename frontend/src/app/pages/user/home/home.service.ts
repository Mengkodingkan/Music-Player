import {Injectable} from '@angular/core';
import {AppComponent} from "../../../app.component";
import {BehaviorSubject, map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  data: any;

  constructor() {
  }
}
