import {Injectable} from '@angular/core';
import likedSongs from '../../../assets/data/likedSongs.json';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  songs: any[] = []

  constructor() {
  }

  getLikeSongs() {
    this.songs = likedSongs;
    return this.songs;
  }
}
