import {Component, Input, OnInit} from '@angular/core';
import {HowlerJsService} from "../../../services/howler-js.service";
import {SongModel} from "../../../model/song.model";

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
})
export class PlaylistItemComponent implements OnInit {
  @Input() song: SongModel;

  activeSong: SongModel;

  constructor(
    private howler: HowlerJsService
  ) {
  }

  ngOnInit() {
    this.howler.activeSong.subscribe(song => this.activeSong = song);

  }

  onAddToQueue(song: SongModel) {
    this.howler.addToQueue(song);
  }
}
