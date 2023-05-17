import {Component, OnInit} from '@angular/core';

import likedSong from "../../../../assets/data/likedSongs.json";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  handlerMessage = '';
  roleMessage = '';
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'cancel',
      handler: () => {
        this.handlerMessage = 'Alert canceled';
      },
    },
    {
      text: 'Yes, delete it',
      role: 'confirm',
      cssClass: 'delete',
      handler: () => {
        this.handlerMessage = 'Alert confirmed';
      },
    },
  ];

  data = likedSong;

  constructor() {
  }

  ngOnInit() {
  }
}
