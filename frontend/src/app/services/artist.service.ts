import {Injectable} from '@angular/core';
import {ArtistModel} from "../models/artist.model";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private _artists: ArtistModel[] = [
    new ArtistModel('1', 'Kini'),
    new ArtistModel('2', 'Ga Dulu'),
    new ArtistModel('3', 'Sering'),
    new ArtistModel('4', 'Ga Tau')
  ]

  constructor() {
  }

  getArtistById(id: any) {
    return {...this._artists.find(data => data.id === id)}
  }
}
