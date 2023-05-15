import {Injectable} from '@angular/core';
import followingArtist from '../../../assets/data/followed-artists.json';

@Injectable({
  providedIn: 'root'
})
export class FollowingArtistService {

  following: any[] = [];

  constructor() {
  }

  getAllFollowingArtist() {
    this.following = followingArtist;
    return this.following;
  }
}
