import {Component, OnInit} from '@angular/core';

import {register} from 'swiper/element/bundle';
import {HomeService} from "./home.service";
import {Subscription} from "rxjs";


register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data: any[];
  private dataSub: Subscription;

  constructor(
    private homeService: HomeService
  ) {
  }

  ngOnInit() {
    this.homeService.fetchData().subscribe()
    this.dataSub = this.homeService.data.subscribe(res => {
      this.data = res;
      console.log(this.data)
    })

  }

  ionViewWillEnter() {
  }
}
