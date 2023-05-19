import {Injectable} from '@angular/core';
import {SongModel} from "../models/song.model";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private _songs: SongModel[] = [
    new SongModel('1', 'Born To Die', '/assets/musics/Coldplay - TheScientist.mp3', 123, '2010', '1', '1'),
    new SongModel('2', 'Ex:Re', '/assets/musics/Radiohead - No Surprises.mp3', 123, '2015', '2', '1'),
    new SongModel('3', 'On Fire', '/assets/musics/Coldplay - TheScientist.mp3', 123, '2014', '3'),
    new SongModel('4', 'The Creek Drank', '/assets/musics/Disenchanted.mp3', 123, '2011', '4', '1'),
  ];

  get songs() {
    return [...this._songs]
  }

  private _topSongs: SongModel[] = [
    new SongModel('1', 'Born To Die', '/assets/musics/Coldplay - TheScientist.mp3', 123, '2010', '1', '1'),
    new SongModel('2', 'Ex:Re', '/assets/musics/Radiohead - No Surprises.mp3', 123, '2015', '2', '1'),
    new SongModel('3', 'On Fire', '/assets/musics/Coldplay - TheScientist.mp3', 123, '2014', '3', '1'),
    new SongModel('4', 'The Creek Drank', '/assets/musics/Disenchanted.mp3', 123, '2011', '4', '1'),
  ]

  get topSongs() {
    return [...this._topSongs]
  }

  getSongById(id: any) {
    return {...this._songs.find(data => data.id === id)}
  }

  getSongsByPlaylistId(id: any) {
    return [...this._songs.filter(data => data.idPlaylistId === id)]
  }
}
