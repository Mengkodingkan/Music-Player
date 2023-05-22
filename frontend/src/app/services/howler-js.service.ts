import {Injectable} from '@angular/core';
import {Howl} from 'howler';
import {BehaviorSubject} from "rxjs";
import {HomeService} from "../pages/user/home/home.service";

@Injectable({
  providedIn: 'root'
})
export class HowlerJsService {

  queues: any[] = [];

  // @ts-ignore
  howlPlayer: Howl = null;
  //
  // playSong() {
  //   // check queues
  //   const s = this.queues;
  //   const songs = s.map((a: any) => a.song_url);
  //   const howler = new Howl({
  //     src: songs
  //   });
  //
  //   howler.play();
  //   if (!this.eventActive)
  //     this.onEvent();
  //   this.howler = howler;
  // }
  //
  // addToQueueAndPlay(item: any) {
  //   // check is queue not empty
  //   if (this.queues.length > 0) {
  //     this.queues = [];
  //     this.isPlaying = false;
  //     this.howler.stop();
  //   }
  //
  //   if (Array.isArray(item))
  //     this.queues.push(...item);
  //   else
  //     this.queues.push(item);
  //
  //   if (!this.isPlaying) {
  //     this.playSong();
  //     this.isPlaying = true;
  //   }
  // }
  //
  // onEvent() {
  //   this.howler?.on('end', () => {
  //     this.queues.shift();
  //     if (this.queues.length > 0) {
  //       this.howler.play();
  //     } else {
  //       this.isPlaying = false;
  //     }
  //   });
  //   this.eventActive = true;
  // }

  private _activeSong = new BehaviorSubject<any>(null);
  currentSong = this._activeSong.asObservable();

  private _defaultIsPause = new BehaviorSubject<boolean>(false);
  isPause = this._defaultIsPause.asObservable();

  private _progressBar = new BehaviorSubject<number>(0);
  progressBar = this._progressBar.asObservable();

  private _start = new BehaviorSubject<number>(0);
  start = this._start.asObservable();

  private _end = new BehaviorSubject<number>(0);
  end = this._end.asObservable();

  private progressInterval: any;
  private currentIndex: number = 0;
  private playlist: any;

  constructor(
  ) {
  }

  addToQueue(song: any) {
    if (this._activeSong.getValue() === song) {
      return;
    } else {
      this.howlPlayer?.stop();
    }

    this.howlPlayer = new Howl({
      src: [song.song_url],
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

  }

  previous() {

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
