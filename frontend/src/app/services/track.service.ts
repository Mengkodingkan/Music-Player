import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TopMusicModel} from "../models/top-music.model";

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private track = new BehaviorSubject<any>(TopMusicModel)
  currentTrack = this.track.asObservable();

  nextTrack(track: any) {
    this.track.next(track)
  }

}
