import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  handlerMessage = '';
  alertButtons = [
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

  constructor() {
  }

  ngOnInit() {
  }
}
