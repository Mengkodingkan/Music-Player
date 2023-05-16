import {Component, OnInit} from '@angular/core';
import {register} from 'swiper/element/bundle';
register();
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data = [
    {
      title: "Top Music",
      playlists: this.homeService.getTopMusic()
    }
  ]

  constructor(public homeService: HomeService) {
  }

  ngOnInit() {
  }

}
