import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
})
export class PlaylistsPage implements OnInit {

  handlerMessage = '';
  roleMessage = '';
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.handlerMessage = 'Alert canceled';
      },
    },
    {
      text: 'Yes, delete it',
      role: 'confirm',
      cssClass: 'delete-it',
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
