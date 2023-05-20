import {Component, Input, OnInit} from '@angular/core';
import {HowlerJsService} from "../../../services/howler-js.service";

@Component({
  selector: 'app-player-ctrl',
  templateUrl: './player-ctrl.component.html',
  styleUrls: ['./player-ctrl.component.scss'],
})
export class PlayerCtrlComponent implements OnInit {
  @Input() song: any;

  constructor(
    private howler: HowlerJsService,
  ) {
  }

  ngOnInit() {
    console.log(this.howler.activeSong)
  }


  // onPlayPause(con: any) {
  //   this.howler.togglePlayPause(con);
  //   this.howler.isPlaying = this.isPlaying;
  //   this.isPlaying = !this.isPlaying;
  // }
}
