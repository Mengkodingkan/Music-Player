import {Injectable} from '@angular/core';
import data from "../../../../assets/file.json";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() {
  }

  getData() {
    return data;
  }
}
