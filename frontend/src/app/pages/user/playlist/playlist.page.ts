import {Component, OnInit} from '@angular/core';
import {SongService} from "../../../services/song.service";
import {AlbumService} from "../../../services/album.service";
import {PlaylistService} from "../../../services/playlist.service";
import {PlaylistModel} from "../../../models/playlist.model";
import {SongModel} from "../../../models/song.model";
import {ArtistService} from "../../../services/artist.service";


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  playlists: any[] = [];
  loadedSongs: SongModel[] = [];

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

  constructor(
    private songService: SongService,
    private albumService: AlbumService,
    private playlistService: PlaylistService,
    private artistService: ArtistService
  ) {
  }

  ngOnInit() {
    this.loadedSongs = this.songService.getSongsByPlaylistId('1');

    this.playlists = this.loadedSongs.map(song => {
      const album = this.albumService.getAlbumById(song.idAlbumId);
      const artist = this.artistService.getArtistById(album.idArtistId);

      return {
        ...song,
        album: album,
        artist: artist
      }
    });
  }
}
