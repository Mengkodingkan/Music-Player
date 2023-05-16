import {Injectable} from '@angular/core';
import topMusic from '../../../assets/data/topMusic.json';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  topMusic: any[] = [];

  constructor() {
  }

  getTopMusic() {
    this.topMusic = topMusic;
    return this.topMusic;
  }

}
