import {Component, OnInit} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-discovered',
  templateUrl: './discovered.page.html',
  styleUrls: ['./discovered.page.scss'],
})
export class DiscoveredPage implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const swiper = new Swiper('.swiper', {
      direction: 'vertical',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

}
