import {Component, Input, OnInit} from '@angular/core';
import {HowlerJsService} from "../../../services/howler-js.service";

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
})
export class PlaylistItemComponent implements OnInit {
  @Input() song: any;

  currentSong: any;

  constructor(
    private howler: HowlerJsService
  ) {
  }

  ngOnInit() {
    this.howler.currentSong.subscribe(song => this.currentSong = song);

  }

  onAddToQueue(song: any) {
    this.howler.addToQueue(song);
  }
}
