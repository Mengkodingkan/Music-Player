import {Component, OnInit} from '@angular/core';

import followedArtist from '../../../../assets/data/followed-artists.json'

@Component({
  selector: 'app-followed',
  templateUrl: './followed.page.html',
  styleUrls: ['./followed.page.scss'],
})
export class FollowedPage implements OnInit {

  data = followedArtist;

  constructor() {
  }

  ngOnInit() {
  }

}
