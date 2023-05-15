import {Component, OnInit} from '@angular/core';
import {FollowingArtistService} from "../../services/following-artist.service";

@Component({
  selector: 'app-followed',
  templateUrl: './followed.page.html',
  styleUrls: ['./followed.page.scss'],
})
export class FollowedPage implements OnInit {

  data = this.followingArtistService.getAllFollowingArtist();

  constructor(private followingArtistService: FollowingArtistService) {
  }

  ngOnInit() {
  }

}
