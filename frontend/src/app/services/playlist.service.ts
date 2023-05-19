import {Injectable} from '@angular/core';
import {PlaylistModel} from "../models/playlist.model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor() {
  }

  private _playlists: PlaylistModel[] = [
    new PlaylistModel('1', 'Liked Song'),
  ]

  get playlists() {
    return [...this._playlists]
  }

  getPlaylistById(id: any) {
    return {...this._playlists.find(data => data.id === id)}
  }
}
