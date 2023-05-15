import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import data from '../../assets/data/data.json';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  albumData = null;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const title = this.activatedRoute.snapshot.paramMap.get('albumId');
    // this.albumData =
  }

}
