import {Injectable} from '@angular/core';
import {Howl} from 'howler';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HowlerJsService {
  // queues: any;
  // howler: any;
  // eventActive = false

  // @ts-ignore
  howlPlayer: Howl = null;

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
  activeSong: any = null;
  isPlaying = false;

  constructor() {
    // this.queues = [];
  }

  startSong(song: any) {
    if (this.howlPlayer) {
      this.howlPlayer.stop();
    }

    this.howlPlayer = new Howl({
      src: [song.song_url],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.activeSong = song;
      },
      onend: () => {
        this.isPlaying = false;
      }
    });
    this.howlPlayer.play();
  }

  togglePlayPause(play: boolean) {
    this.isPlaying = !play;
    if (play) {
      this.howlPlayer.pause();
    } else {
      this.howlPlayer.play();
    }
  }

  next() {

  }

  previous() {

  }

  updateProgress() {

  }


}
