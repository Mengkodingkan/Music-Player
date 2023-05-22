import {Component, OnInit} from '@angular/core';
import {HowlerJsService} from "../../../services/howler-js.service";

@Component({
  selector: 'app-player-ctrl',
  templateUrl: './player-ctrl.component.html',
  styleUrls: ['./player-ctrl.component.scss'],
})
export class PlayerCtrlComponent implements OnInit {
  activeSong: any;
  isPlaying: boolean;
  progressBar: number;
  start: number;
  end: number;
  isLike: boolean;

  constructor(
    private howler: HowlerJsService,
  ) {

  }

  ngOnInit() {
    this.howler.currentSong.subscribe(activeSong => this.activeSong = activeSong);
    this.howler.progressBar.subscribe(progressBar => this.progressBar = progressBar);
    this.howler.isPause.subscribe(isPlaying => this.isPlaying = isPlaying);
    this.howler.start.subscribe(start => this.start = start);
    this.howler.end.subscribe(end => this.end = end);
  }

  durationHelper(second: any) {
    let minute: number = Math.floor(second / 60);
    let secondLeft: number = second % 60;
    return minute + ":" + (secondLeft < 10 ? "0" : "") + secondLeft;
  }

  onPlayer(pause: boolean) {
    this.howler.togglePlayer(pause);
    this.isPlaying = !this.isPlaying;
  }

  onSeek(event: any) {
    this.howler.seekTo(event);
  }

  onNext() {
    this.howler.next();
  }

  onPrevious() {
    this.howler.previous();
  }


  // TODO onLike
  onLike(like: boolean) {
    this.isLike = !like;

  }

}
