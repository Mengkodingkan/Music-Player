import {Injectable} from '@angular/core';
import {AlbumModel} from "../models/album.model";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private _albums: AlbumModel[] = [
    new AlbumModel('1', '/assets/images/albums/born-to-die.jpg', '1'),
    new AlbumModel('2', '/assets/images/albums/ex-re.jpg', '2'),
    new AlbumModel('3', '/assets/images/albums/swimming.jpg', '3'),
    new AlbumModel('4', '/assets/images/albums/the-creek-drank.jpg', '4'),
  ]

  constructor() {
  }

  getAlbumById(id: any) {
    return {...this._albums.find(data => data.id === id)}
  }
}
