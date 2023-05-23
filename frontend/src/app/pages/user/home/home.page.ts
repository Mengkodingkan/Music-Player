import {Component, OnInit} from '@angular/core';

import {register} from 'swiper/element/bundle';
import {HowlerJsService} from "../../../services/howler-js.service";
import {HomeService} from "./home.service";

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data: any;
  currentSong: any;
  index: any;

  constructor(
    private howler: HowlerJsService,
    private homeService: HomeService
  ) {
  }

  ngOnInit() {
    this.homeService.fetchData();
    this.howler.currentSong.subscribe(song => this.currentSong = song);
    this.homeService.data.subscribe(data => {
      this.data = data;
    });
  }

  onAddToQueue(song: any) {
    // const arr = [...song];
    // const index = arr.findIndex((item: any) => item.id === song.id);
    // arr.splice(index, 1);
    // arr.unshift(song);

    this.howler.addToQueue(song);
  }
}
