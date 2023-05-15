import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";

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

  likeSongs: any[] = this.playlistService.getLikeSongs();

  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit() {
  }
}
