import {Injectable} from '@angular/core';
import {Howl} from 'howler';
import {BehaviorSubject} from "rxjs";
import {SongModel} from "../model/song.model";

@Injectable({
  providedIn: 'root'
})
export class HowlService {
  private _activeSong = new BehaviorSubject<any>(null);
  private _defaultIsPause = new BehaviorSubject<boolean>(false);
  private _progressBar = new BehaviorSubject<number>(0);
  private _start = new BehaviorSubject<number>(0);
  private _end = new BehaviorSubject<number>(0);

  private progressInterval: any;
  private howlPlayer: any = null;
  private tracks: SongModel[] = [];
  private currentIndex: number;

  get activeSong() {
    return this._activeSong.asObservable();
  }

  get isPause() {
    return this._defaultIsPause.asObservable();
  }

  get progressBar() {
    return this._progressBar.asObservable();
  }

  get start() {
    return this._start.asObservable();
  }

  get end() {
    return this._end.asObservable();
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  setTracks(tracks: SongModel[]) {
    this.tracks = tracks;
  }

  playSong(song: SongModel) {
    if (this._activeSong.getValue() === song) {
      return;
    } else {
      this.howlPlayer?.stop();
    }
    this.howlPlayer = new Howl({
      src: [this.tracks[this.currentIndex].url],
      html5: true,
      onplay: () => {
        this._defaultIsPause.next(false);
        this._activeSong.next(song);
        this._end.next(Math.round(this.howlPlayer.duration()));
        this._start.next(Math.round(this.howlPlayer.seek()));
        this.startProgressInterval();
      },
      onend: () => {
        this._defaultIsPause.next(true);
        this.stopProgressInterval();
      }
    });
    this.howlPlayer.play();

  }

  togglePlayer(pause: boolean) {
    this._defaultIsPause.next(!pause);
    if (pause) {
      this.howlPlayer.pause();
    } else {
      this.howlPlayer.play();
    }
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex >= this.tracks.length) {
      this.currentIndex = 0;
    }
    console.log(this.currentIndex)
    this.playSong(this.tracks[this.currentIndex]);
  }

  previous() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.tracks.length - 1;
    }
    this.playSong(this.tracks[this.currentIndex]);
  }

  seekTo(event: any) {
    const seekTo = (event.target.value / 100) * this.howlPlayer.duration();
    this._start.next(Math.round(seekTo));
    this.howlPlayer.seek(seekTo);
  }

  startProgressInterval() {
    this.progressInterval = setInterval(() => {
      const seek = this.howlPlayer.seek() || 0;
      this._start.next(Math.round(seek));
      this._progressBar.next(
        seek / this.howlPlayer.duration() * 100
      );
    }, 1);
  }

  stopProgressInterval() {
    clearInterval(this.progressInterval);
  }

}
